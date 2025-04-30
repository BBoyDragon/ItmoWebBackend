import { Ticket } from '../../ticket/entities/ticket.entity';
import { FoodOrder } from '../../food-order/entities/food-order.entity';

export class User {
    id: number;
    username: string;
    email: string;
    tickets?: Ticket[];
    orders?: FoodOrder[];
}