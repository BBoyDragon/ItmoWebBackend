// food.model.ts
import { ObjectType, Field, Int } from '@nestjs/graphql';
import { FoodOrderModel } from '../../food-order/graphQl/food-order.model';

@ObjectType()
export class FoodModel {
  @Field(() => Int)
  id: number;

  @Field()
  name: string;

  @Field(() => Int)
  price: number;

  @Field(() => [FoodOrderModel], { nullable: true })
  orders?: FoodOrderModel[];
}
