import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { FoodOrderService } from './food-order.service';
import { CreateFoodOrderDto } from './dto/create-food-order.dto';
import { UpdateFoodOrderDto } from './dto/update-food-order.dto';
import { ApiTags, ApiOperation, ApiResponse, ApiParam, ApiBody } from '@nestjs/swagger';
import { FoodOrder } from './entities/food-order.entity';

@ApiTags('Food Orders')
@Controller('api/food-order')
export class FoodOrderController {
  constructor(private readonly foodOrderService: FoodOrderService) {}

  @Post()
  @ApiOperation({ summary: 'Create a new food order' })
  @ApiBody({
    description: 'Data needed to create a food order',
    schema: {
      example: {
        foodId: 1,
        quantity: 2,
        customerName: 'John Doe',
        address: '123 Pizza St, Food City',
        status: 'Pending',
      },
    },
  })
  @ApiResponse({
    status: 201,
    description: 'Food order created',
    type: FoodOrder,
    schema: {
      example: {
        id: 1,
        foodId: 1,
        quantity: 2,
        customerName: 'John Doe',
        address: '123 Pizza St, Food City',
        status: 'Pending',
      },
    },
  })
  create(@Body() createFoodOrderDto: CreateFoodOrderDto) {
    return this.foodOrderService.create(createFoodOrderDto);
  }

  @Get()
  @ApiOperation({ summary: 'Get all food orders' })
  @ApiResponse({
    status: 200,
    description: 'List of food orders',
    type: [FoodOrder],
    schema: {
      example: [
        {
          id: 1,
          foodId: 1,
          quantity: 2,
          customerName: 'John Doe',
          address: '123 Pizza St, Food City',
          status: 'Pending',
        },
      ],
    },
  })
  findAll() {
    return this.foodOrderService.findAll();
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get a food order by ID' })
  @ApiParam({
    name: 'id',
    type: Number,
    description: 'Unique identifier of the food order',
    example: 1,
  })
  @ApiResponse({
    status: 200,
    description: 'Food order found',
    type: FoodOrder,
    schema: {
      example: {
        id: 1,
        foodId: 1,
        quantity: 2,
        customerName: 'John Doe',
        address: '123 Pizza St, Food City',
        status: 'Pending',
      },
    },
  })
  @ApiResponse({ status: 404, description: 'Food order not found' })
  findOne(@Param('id') id: string) {
    return this.foodOrderService.findOne(+id);
  }

  @Patch(':id')
  @ApiOperation({ summary: 'Update a food order' })
  @ApiParam({
    name: 'id',
    type: Number,
    description: 'Unique identifier of the food order',
    example: 1,
  })
  @ApiBody({
    description: 'Data to update a food order',
    schema: {
      example: {
        foodId: 2,
        quantity: 3,
        customerName: 'John Doe',
        address: '456 Burger Rd, Food City',
        status: 'Delivered',
      },
    },
  })
  @ApiResponse({
    status: 200,
    description: 'Food order updated',
    type: FoodOrder,
    schema: {
      example: {
        id: 1,
        foodId: 2,
        quantity: 3,
        customerName: 'John Doe',
        address: '456 Burger Rd, Food City',
        status: 'Delivered',
      },
    },
  })
  update(
    @Param('id') id: string,
    @Body() updateFoodOrderDto: UpdateFoodOrderDto,
  ) {
    return this.foodOrderService.update(+id, updateFoodOrderDto);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Delete a food order' })
  @ApiParam({
    name: 'id',
    type: Number,
    description: 'Unique identifier of the food order',
    example: 1,
  })
  @ApiResponse({
    status: 200,
    description: 'Food order deleted',
    type: FoodOrder,
    schema: {
      example: {
        id: 1,
        foodId: 1,
        quantity: 2,
        customerName: 'John Doe',
        address: '123 Pizza St, Food City',
        status: 'Pending',
      },
    },
  })
  remove(@Param('id') id: string) {
    return this.foodOrderService.remove(+id);
  }
}
