import { Ticket } from '../../ticket/entities/ticket.entity';
import { Status as Status } from '@prisma/client';


export class Film {
    id: number;
    name: string;
    status: Status;
    tickets?: Ticket[];
}