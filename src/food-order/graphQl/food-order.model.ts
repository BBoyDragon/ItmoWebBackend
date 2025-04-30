import { ObjectType, Field, Int } from '@nestjs/graphql';
import { Status } from '@prisma/client';
import { FoodModel } from '../../food/graphQl/food.model'; // путь может отличаться

@ObjectType()
export class FoodOrderModel {
  @Field(() => Int)
  id: number;

  @Field(() => String)
  status: Status;

  @Field(() => [FoodModel], { nullable: true })
  foods?: FoodModel[];
}