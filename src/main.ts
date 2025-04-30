import { NestFactory } from '@nestjs/core';
import { NestExpressApplication } from '@nestjs/platform-express';
import { join } from 'path';
import * as hbs from 'hbs';
import { AppModule } from './app.module';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule);

  app.useStaticAssets(join(__dirname, '../..', 'public'));
  app.setBaseViewsDir(join(__dirname, '../..', 'views'));
  console.log(join(__dirname,'../..', 'views'));
  app.setViewEngine('hbs');
  hbs.registerHelper('asset', (path: string) => {
    return '/' + path;
  });
  hbs.registerPartials(join(__dirname, '../..', 'views/partials'));

  const config = new DocumentBuilder()
    .setTitle('Cinema API')
    .setDescription('API for managing users, films, tickets, and food orders')
    .setVersion('1.0')
    .build();

  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, document);

  const port = process.env.PORT ? parseInt(process.env.PORT, 10) : 3000;
  await app.listen(port);
  console.log(`Application is running on: http://localhost:${port}`);
}
bootstrap();
