import { Get, Controller, Render } from '@nestjs/common';

@Controller()
export class AppController {
  @Get()
  @Render('index')
  root() {
    return { message: 'Hello world!' };
  }
  @Get('/Food')
  @Render('Food')
  food() {
    return { message: 'Hello world!' };
  }

  @Get('/Shedule')
  @Render('Shedule')
  Shedule() {
    return { message: 'Hello world!' };
  }
  @Get('/Colaboration')
  @Render('Colaboration')
  Colaboration() {
    return { message: 'Hello world!' };
  }
  @Get('/index')
  @Render('index')
  index() {
    return { message: 'Hello world!' };
  }



}