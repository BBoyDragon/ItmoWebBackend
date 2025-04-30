import { InputType, Field, Int } from '@nestjs/graphql';

@InputType()
export class CreateFoodInput {
  @Field()
  name: string;

  @Field(() => Int)
  price: number;
}