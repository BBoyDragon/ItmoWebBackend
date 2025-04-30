import { Get, Controller, Render, Post, Redirect, Body, Query, NotFoundException } from '@nestjs/common';
import { FilmService } from './film/film.service';
import { CreateUserDto } from './user/dto/create-user.dto';
import { UserService } from './user/user.service';
import { User } from './user/entities/user.entity';
import { TicketService } from './ticket/ticket.service';
import { CreateTicketDto } from './ticket/dto/create-ticket.dto';
import { Ticket } from './ticket/entities/ticket.entity'; // путь к FilmService

@Controller()
export class AppController {
  constructor(private readonly filmService: FilmService, private readonly userService: UserService, private readonly ticketService: TicketService ) {
  }

  @Get()
  @Render('index')
  async root() {
    const films = await this.filmService.findAll();

    return {
      layout: 'layouts/main',
      message: 'Hello world!',
      isIndex: true,
      films,
    };
  }

  @Get('/index')
  @Render('index')
  async index() {
    const films = await this.filmService.findAll();

    return {
      layout: 'layouts/main',
      message: 'Hello world!',
      isIndex: true,
      films,
    };
  }

  @Get('/films/json')
  async getFilmsJson() {
    return this.filmService.findAll();
  }

  @Get('/user/json')
  async getUserByEmail(@Query('email') email: string): Promise<User> {
    if (!email) {
      throw new NotFoundException('Email query parameter is required.');
    }

    return this.userService.findOneByMail(email);
  }

  @Get('/Food')
  @Render('Food')
  food() {
    return {
      layout: 'layouts/main',
      message: 'Hello world!',
      isIndex: false,
      isFood: true,
    };
  }

  @Get('/Shedule')
  @Render('Shedule')
  shedule() {
    return {
      layout: 'layouts/main',
      message: 'Hello world!',
      isIndex: false,
    };
  }

  @Get('/Colaboration')
  @Render('Colaboration')
  colaboration() {
    return {
      layout: 'layouts/main',
      message: 'Hello world!',
      isIndex: false,
    };
  }

  @Post('/user')
  async create(@Body() dto: CreateUserDto) {
    await this.userService.create(dto);
  }

  @Post('/ticket')
  async createTicket(@Body() dto: CreateTicketDto): Promise<Ticket> {
    return this.ticketService.create(dto);
  }

}
