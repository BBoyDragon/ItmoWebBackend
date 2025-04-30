import { Resolver, Query, Mutation, Args, Int, ResolveField, Parent } from '@nestjs/graphql';
import { FoodService } from './../food.service';
import { FoodModel } from './food.model';
import { CreateFoodInput } from './create-food.input';
import { Food } from '../entities/food.entity';
import { FoodOrderModel } from '../../food-order/graphQl/food-order.model';

@Resolver(() => FoodModel)
export class FoodResolver {
  constructor(private readonly foodService: FoodService) {}

  @Mutation(() => FoodModel)
  async createFood(
    @Args('createFoodInput') createFoodInput: CreateFoodInput,
  ): Promise<FoodModel> {
    const food = await this.foodService.create(createFoodInput);
    return this.toModel(food);
  }

  @Query(() => [FoodModel], { name: 'foods' })
  async findAll(): Promise<FoodModel[]> {
    const foods = await this.foodService.findAll();
    return foods.map(this.toModel);
  }

  @Query(() => FoodModel, { name: 'food' })
  async findOne(@Args('id', { type: () => Int }) id: number): Promise<FoodModel> {
    const food = await this.foodService.findOne(id);
    return this.toModel(food);
  }

  @ResolveField(() => [FoodOrderModel], { nullable: true })
  orders(@Parent() food: FoodModel): FoodOrderModel[] {
    return food.orders ?? [];
  }

  private toModel = (food: Food): FoodModel => ({
    id: food.id,
    name: food.name,
    price: food.price,
    orders: food.orders,
  });
}
