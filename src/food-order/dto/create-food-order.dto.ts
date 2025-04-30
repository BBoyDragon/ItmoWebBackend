import { Status as Status } from '@prisma/client';
import { User } from '../../user/entities/user.entity';

class FoodItemDto {
  foodId: number;
}

export class CreateFoodOrderDto {
  status: Status;

  foods: number[];
  user:number;
}
