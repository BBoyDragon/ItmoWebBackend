import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateFilmDto } from './dto/create-film.dto';
import { UpdateFilmDto } from './dto/update-film.dto';
import { Film } from './entities/film.entity';

@Injectable()
export class FilmService {
  constructor(private prisma: PrismaService) {}

  async create(dto: CreateFilmDto): Promise<Film> {
    if (!dto.name || dto.name.trim() === '') {
      throw new BadRequestException('Film name must not be empty.');
    }

    const existing = await this.prisma.film.findFirst({
      where: { name: dto.name },
    });

    if (existing) {
      throw new BadRequestException('Film with this name already exists.');
    }

    return this.prisma.film.create({
      data: {
        name: dto.name,
        status: 'Created',
        genre: dto.genre,
        image: dto.image,
      },
    });
  }

  async findAll(): Promise<Film[]> {
    return this.prisma.film.findMany({ include: { tickets: true } });
  }

  async findOne(id: number): Promise<Film> {
    const film = await this.prisma.film.findUnique({
      where: { id },
      include: { tickets: true },
    });

    if (!film) {
      throw new NotFoundException(`Film with ID ${id} not found.`);
    }

    return film;
  }

  async update(id: number, dto: UpdateFilmDto): Promise<Film> {
    const film = await this.prisma.film.findUnique({ where: { id } });

    if (!film) {
      throw new NotFoundException(`Cannot update. Film with ID ${id} not found.`);
    }

    return this.prisma.film.update({
      where: { id },
      data: dto,
    });
  }

  async remove(id: number): Promise<Film> {
    const film = await this.prisma.film.findUnique({ where: { id } });

    await this.prisma.ticket.deleteMany({
      where: { filmId: id },
    });

    if (!film) {
      throw new NotFoundException(`Cannot delete. Film with ID ${id} not found.`);
    }

    return this.prisma.film.delete({ where: { id } });
  }
}
