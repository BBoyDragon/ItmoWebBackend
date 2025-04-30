import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateTicketDto } from './dto/create-ticket.dto';
import { UpdateTicketDto } from './dto/update-ticket.dto';
import { Ticket } from './entities/ticket.entity';

@Injectable()
export class TicketService {
  constructor(private prisma: PrismaService) {}

  async create(dto: CreateTicketDto): Promise<Ticket> {
    // Проверка валидности цены
    if (dto.price <= 0) {
      throw new BadRequestException('Ticket price must be greater than 0.');
    }

    const film = await this.prisma.film.findUnique({
      where: { id: dto.filmId },
    });
    if (!film) {
      throw new NotFoundException(`Film with ID ${dto.filmId} not found.`);
    }

    const user = await this.prisma.user.findUnique({
      where: { id: dto.userId },
    });
    if (!user) {
      throw new NotFoundException(`User with ID ${dto.userId} not found.`);
    }

    return this.prisma.ticket.create({
      data: {
        filmId: dto.filmId,
        userId: dto.userId,
        price: dto.price,
      },
    });
  }

  async findAll(): Promise<Ticket[]> {
    return this.prisma.ticket.findMany({
      include: { film: true, user: true },
    });
  }

  async findOne(id: number): Promise<Ticket> {
    const ticket = await this.prisma.ticket.findUnique({
      where: { id },
      include: { film: true, user: true },
    });
    if (!ticket) {
      throw new NotFoundException(`Ticket with ID ${id} not found.`);
    }
    return ticket;
  }


  async update(id: number, dto: UpdateTicketDto): Promise<Ticket> {
    const existing = await this.prisma.ticket.findUnique({ where: { id } });
    if (!existing) {
      throw new NotFoundException(`Cannot update. Ticket with ID ${id} not found.`);
    }

    if (dto.price != null && dto.price <= 0) {
      throw new BadRequestException('Ticket price must be greater than 0.');
    }

    if (dto.filmId != null) {
      const film = await this.prisma.film.findUnique({ where: { id: dto.filmId } });
      if (!film) {
        throw new NotFoundException(`Film with ID ${dto.filmId} not found.`);
      }
    }

    if (dto.userId != null) {
      const user = await this.prisma.user.findUnique({ where: { id: dto.userId } });
      if (!user) {
        throw new NotFoundException(`User with ID ${dto.userId} not found.`);
      }
    }

    return this.prisma.ticket.update({
      where: { id },
      data: dto,
    });
  }

  async remove(id: number): Promise<Ticket> {
    const existing = await this.prisma.ticket.findUnique({ where: { id } });
    if (!existing) {
      throw new NotFoundException(`Cannot delete. Ticket with ID ${id} not found.`);
    }
    return this.prisma.ticket.delete({ where: { id } });
  }
}
