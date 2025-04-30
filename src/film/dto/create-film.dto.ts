
import { Status as Status } from '@prisma/client';

export class CreateFilmDto {
    name: string;
    status: Status;
}
