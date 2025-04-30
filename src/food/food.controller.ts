import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  NotFoundException,
} from '@nestjs/common';
import {
  ApiTags,
  ApiOperation,
  ApiResponse,
  ApiParam,
  ApiBody,
} from '@nestjs/swagger';
import { FoodService } from './food.service';
import { CreateFoodDto } from './dto/create-food.dto';
import { UpdateFoodDto } from './dto/update-food.dto';
import { Food } from './entities/food.entity';

@ApiTags('Food')
@Controller('api/food')
export class FoodController {
  constructor(private readonly foodService: FoodService) {}

  @Post()
  @ApiOperation({ summary: 'Create a new food item' })
  @ApiBody({
    description: 'Data needed to create a food item',
    schema: {
      example: {
        name: 'Pizza',
        price: 5
      },
    },
  })
  @ApiResponse({
    status: 201,
    description: 'Food item created successfully',
    type: Food,
    schema: {
      example: {
        id: 1,
        name: 'Pizza',
        price: 5
      },
    },
  })
  create(@Body() createFoodDto: CreateFoodDto): Promise<Food> {
    return this.foodService.create(createFoodDto);
  }

  @Get()
  @ApiOperation({ summary: 'Get all food items' })
  @ApiResponse({
    status: 200,
    description: 'List of food items',
    type: [Food],
    schema: {
      example: [
        {
          id: 1,
          name: 'Pizza',
          price: 5
        },
      ],
    },
  })
  findAll(): Promise<Food[]> {
    return this.foodService.findAll();
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get a food item by ID' })
  @ApiParam({
    name: 'id',
    type: Number,
    description: 'Unique identifier of the food item',
    example: 1,
  })
  @ApiResponse({
    status: 200,
    description: 'Food item found',
    type: Food,
    schema: {
      example: {
        id: 1,
        name: 'Pizza',
        price: 5
      },
    },
  })
  @ApiResponse({ status: 404, description: 'Food item not found' })
  async findOne(@Param('id') id: string): Promise<Food> {
    const food = await this.foodService.findOne(+id);
    if (!food) {
      throw new NotFoundException(`Food item with id ${id} not found`);
    }
    return food;
  }

  @Patch(':id')
  @ApiOperation({ summary: 'Update a food item by ID' })
  @ApiParam({
    name: 'id',
    type: Number,
    description: 'Unique identifier of the food item',
    example: 1,
  })
  @ApiBody({
    description: 'Data to update a food item',
    schema: {
      example: {
        name: 'Updated Pizza',
        price: 5
      },
    },
  })
  @ApiResponse({
    status: 200,
    description: 'Food item updated successfully',
    type: Food,
    schema: {
      example: {
        id: 1,
        name: 'Updated Pizza',
        price: 5
      },
    },
  })
  update(
    @Param('id') id: string,
    @Body() updateFoodDto: UpdateFoodDto,
  ): Promise<Food> {
    return this.foodService.update(+id, updateFoodDto);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Delete a food item by ID' })
  @ApiParam({
    name: 'id',
    type: Number,
    description: 'Unique identifier of the food item',
    example: 1,
  })
  @ApiResponse({
    status: 200,
    description: 'Food item deleted successfully',
    type: Food,
    schema: {
      example: {
        id: 1,
        name: 'Pizza',
        price: 5
      },
    },
  })
  remove(@Param('id') id: string): Promise<Food> {
    return this.foodService.remove(+id);
  }
}
