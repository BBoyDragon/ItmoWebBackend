import { Ticket } from '../../ticket/entities/ticket.entity';
import { Status as Status } from '@prisma/client';


export class Film {
    id: number;
    name: string;
    genre: string;
    image: string;
    status: Status;
    tickets?: Ticket[];
}