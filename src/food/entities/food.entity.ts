import { FoodOrderOnFood } from '../../food-order/entities/food-order-on-food.entity';
import { FoodOrder } from '../../food-order/entities/food-order.entity';

export class Food {
    id: number;
    name: string;
    orders?: FoodOrder[];
    price: number;
}
