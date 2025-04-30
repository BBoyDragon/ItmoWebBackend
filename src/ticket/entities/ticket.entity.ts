import { User } from '../../user/entities/user.entity';
import { Film } from '../../film/entities/film.entity';

export class Ticket {
    id: number;
    filmId: number;
    userId: number;
    film?: Film;
    user?: User;
    price: number;
}