import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateFoodOrderDto } from './dto/create-food-order.dto';
import { UpdateFoodOrderDto } from './dto/update-food-order.dto';
import { FoodOrder } from './entities/food-order.entity';

@Injectable()
export class FoodOrderService {
  constructor(private prisma: PrismaService) {}

  async create(dto: CreateFoodOrderDto): Promise<FoodOrder> {
    if (!dto.foods || dto.foods.length === 0) {
      throw new BadRequestException('At least one food item must be selected.');
    }

    if (!dto.user) {
      throw new BadRequestException('User ID is required.');
    }

    const userExists = await this.prisma.user.findUnique({
      where: { id: dto.user },
    });

    if (!userExists) {
      throw new NotFoundException(`User with ID ${dto.user} not found.`);
    }

    return this.prisma.foodOrder.create({
      data: {
        status: dto.status,
        foods: { connect: dto.foods.map((id) => ({ id })) },
        userId: dto.user,
      },
    });
  }

  async findAll(): Promise<FoodOrder[]> {
    return this.prisma.foodOrder.findMany({ include: { foods: true } });
  }

  async findOne(id: number): Promise<FoodOrder> {
    const foodOrder = await this.prisma.foodOrder.findUnique({
      where: { id },
      include: { foods: true },
    });

    if (!foodOrder) {
      throw new NotFoundException(`Food order with ID ${id} not found.`);
    }

    return foodOrder;
  }

  async update(id: number, dto: UpdateFoodOrderDto): Promise<FoodOrder> {
    const foodOrder = await this.prisma.foodOrder.findUnique({
      where: { id },
    });

    if (!foodOrder) {
      throw new NotFoundException(`Cannot update. Food order with ID ${id} not found.`);
    }

    if (dto.foods && dto.foods.length > 0) {
      const invalidFoodIds = await this.prisma.food.findMany({
        where: { id: { notIn: dto.foods } },
      });

      if (invalidFoodIds.length > 0) {
        throw new BadRequestException(
          'Some of the food IDs are invalid or do not exist.',
        );
      }
    }

    return this.prisma.foodOrder.update({
      where: { id },
      data: {
        status: dto.status,
        foods: {
          connect: dto.foods?.map((food) => ({ id: food })) ?? [],
        },
      },
    });
  }

  async remove(id: number): Promise<FoodOrder> {
    const foodOrder = await this.prisma.foodOrder.findUnique({
      where: { id },
    });

    if (!foodOrder) {
      throw new NotFoundException(`Cannot delete. Food order with ID ${id} not found.`);
    }

    return this.prisma.foodOrder.delete({ where: { id } });
  }
}
