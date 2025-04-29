import { Get, Controller, Render } from '@nestjs/common';

@Controller()
export class AppController {
    @Get()
    @Render('index')
    root() {
        return {
            layout: 'layouts/main',
            message: 'Hello world!',
            isIndex: true,
        };
    }

    @Get('/index')
    @Render('index')
    index() {
        return {
            layout: 'layouts/main',
            message: 'Hello world!',
            isIndex: true,
        };
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
}
