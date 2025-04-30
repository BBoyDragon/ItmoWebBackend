import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { User } from './entities/user.entity';

@Injectable()
export class UserService {
  constructor(private prisma: PrismaService) {}


  async create(dto: CreateUserDto): Promise<User> {
    if (!dto.username || dto.username.trim() === '') {
      throw new BadRequestException('Username must not be empty.');
    }
    if (!dto.email || !dto.email.includes('@')) {
      throw new BadRequestException('Valid email is required.');
    }


    const existing = await this.prisma.user.findUnique({
      where: { email: dto.email },
    });
    if (existing) {
      throw new BadRequestException('Email is already in use.');
    }

    return this.prisma.user.create({
      data: {
        username: dto.username,
        email: dto.email,
      },
    });
  }


  async findAll(): Promise<User[]> {
    return this.prisma.user.findMany({
      include: { tickets: true, foodOrders: true },
    });
  }


  async findOne(id: number): Promise<User> {
    const user = await this.prisma.user.findUnique({
      where: { id },
      include: { tickets: true, foodOrders: true },
    });
    if (!user) {
      throw new NotFoundException(`User with ID ${id} not found.`);
    }
    return user;
  }
  async findOneByMail(email: string): Promise<User> {
    const user = await this.prisma.user.findUnique({
      where: { email },
      include: { tickets: true, foodOrders: true },
    });
    if (!user) {
      throw new NotFoundException(`User with Email ${email} not found.`);
    }
    return user;
  }


  async update(id: number, dto: UpdateUserDto): Promise<User> {
    const existing = await this.prisma.user.findUnique({ where: { id } });
    if (!existing) {
      throw new NotFoundException(`Cannot update. User with ID ${id} not found.`);
    }

    if (dto.email && !dto.email.includes('@')) {
      throw new BadRequestException('Valid email is required.');
    }

    // Если меняется email, проверяем уникальность
    if (dto.email && dto.email !== existing.email) {
      const other = await this.prisma.user.findUnique({
        where: { email: dto.email },
      });
      if (other) {
        throw new BadRequestException('Email is already in use.');
      }
    }

    return this.prisma.user.update({
      where: { id },
      data: dto,
    });
  }


  async remove(id: number): Promise<User> {
    const existing = await this.prisma.user.findUnique({ where: { id } });
    if (!existing) {
      throw new NotFoundException(`Cannot delete. User with ID ${id} not found.`);
    }
    return this.prisma.user.delete({ where: { id } });
  }
}
