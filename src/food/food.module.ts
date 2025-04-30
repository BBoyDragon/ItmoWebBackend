import { Global, Module } from '@nestjs/common';
import { FoodService } from './food.service';
import { FoodController } from './food.controller';
@Global()
@Module({
  controllers: [FoodController],
  providers: [FoodService],
})
export class FoodModule {}
