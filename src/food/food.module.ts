import { Global, Module } from '@nestjs/common';
import { FoodService } from './food.service';
import { FoodController } from './food.controller';
import { FoodResolver } from './graphQl/food.resolver';
@Global()
@Module({
  controllers: [FoodController],
  providers: [FoodResolver,FoodService],
})
export class FoodModule {}
