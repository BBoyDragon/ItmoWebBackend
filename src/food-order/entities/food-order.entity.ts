import { Status as Status } from '@prisma/client';
import { FoodOrderOnFood } from './food-order-on-food.entity';
import { Food } from '../../food/entities/food.entity';

export class FoodOrder {
    id: number;
    status: Status;
    foods?: Food[];
}
