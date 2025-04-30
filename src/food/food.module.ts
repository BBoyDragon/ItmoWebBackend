import { Global, Module } from '@nestjs/common';
import { CacheModule } from '@nestjs/cache-manager';
import { FoodService } from './food.service';
import { FoodController } from './food.controller';
import { FoodResolver } from './graphQl/food.resolver';
@Global()
@Module({
  imports: [CacheModule.register({ ttl: 60, max: 10 })],
  controllers: [FoodController],
  providers: [FoodResolver,FoodService],
})
export class FoodModule {}
