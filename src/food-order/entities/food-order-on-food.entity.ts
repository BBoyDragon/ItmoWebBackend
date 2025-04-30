import { Food } from '../../food/entities/food.entity';
import { FoodOrder } from './food-order.entity';

export class FoodOrderOnFood {
    foodId: number;
    orderId: number;
    quantity: number;
    food?: Food;
    order?: FoodOrder;
}
