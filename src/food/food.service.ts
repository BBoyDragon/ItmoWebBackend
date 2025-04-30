import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateFoodDto } from './dto/create-food.dto';
import { UpdateFoodDto } from './dto/update-food.dto';
import { Food } from './entities/food.entity';

@Injectable()
export class FoodService {
  constructor(private prisma: PrismaService) {}

  async create(dto: CreateFoodDto): Promise<Food> {
    if (!dto.name || dto.name.trim() === '') {
      throw new BadRequestException('Food name must not be empty.');
    }

    if (dto.price <= 0) {
      throw new BadRequestException('Food price must be greater than 0.');
    }

    const existing = await this.prisma.food.findFirst({
      where: { name: dto.name },
    });

    if (existing) {
      throw new BadRequestException('Food with this name already exists.');
    }

    return this.prisma.food.create({
      data: {
        name: dto.name,
        price: dto.price,
      },
    });
  }

  async findAll(): Promise<Food[]> {
    return this.prisma.food.findMany({ include: { orders: true } });
  }

  async findOne(id: number): Promise<Food> {
    const food = await this.prisma.food.findUnique({
      where: { id },
      include: { orders: true },
    });

    if (!food) {
      throw new NotFoundException(`Food with ID ${id} not found.`);
    }

    return food;
  }

  async update(id: number, dto: UpdateFoodDto): Promise<Food> {
    const food = await this.prisma.food.findUnique({ where: { id } });

    if (!food) {
      throw new NotFoundException(`Cannot update. Food with ID ${id} not found.`);
    }

    if (dto.price && dto.price <= 0) {
      throw new BadRequestException('Food price must be greater than 0.');
    }

    return this.prisma.food.update({
      where: { id },
      data: dto,
    });
  }

  async remove(id: number): Promise<Food> {
    const food = await this.prisma.food.findUnique({ where: { id } });

    if (!food) {
      throw new NotFoundException(`Cannot delete. Food with ID ${id} not found.`);
    }

    return this.prisma.food.delete({ where: { id } });
  }
}
