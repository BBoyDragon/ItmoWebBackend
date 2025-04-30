import { NestFactory } from '@nestjs/core';
import { NestExpressApplication } from '@nestjs/platform-express';
import { join } from 'path';
import * as hbs from 'hbs';
import { AppModule } from './app.module';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';

import * as SuperTokens from 'supertokens-node';
import Session from 'supertokens-node/recipe/session';
import EmailPassword from 'supertokens-node/recipe/emailpassword';
import { middleware, errorHandler } from 'supertokens-node/framework/express';

async function bootstrap() {
  SuperTokens.init({
    framework: 'express',
    supertokens: {
      connectionURI: process.env.SUPERTOKENS_CONNECTION_URI!,
      apiKey: process.env.SUPERTOKENS_API_KEY,
    },
    appInfo: {
      appName: process.env.APP_NAME!,
      apiDomain: process.env.API_DOMAIN!,
      websiteDomain: process.env.WEBSITE_DOMAIN!,
    },
    recipeList: [EmailPassword.init(), Session.init()],
  });

  const app = await NestFactory.create<NestExpressApplication>(AppModule);

  app.useStaticAssets(join(__dirname, '../..', 'public'));
  app.setBaseViewsDir(join(__dirname, '../..', 'views'));
  app.setViewEngine('hbs');
  hbs.registerHelper('asset', (path: string) => '/' + path);
  hbs.registerPartials(join(__dirname, '../..', 'views/partials'));

  const config = new DocumentBuilder()
    .setTitle('Cinema API')
    .setDescription('API for managing users, films, tickets, and food orders')
    .setVersion('1.0')
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, document);

  app.enableCors({
    origin: process.env.WEBSITE_DOMAIN,
    credentials: true,
  });

  app.use(middleware());
  app.use(errorHandler());

  const port = process.env.PORT ? parseInt(process.env.PORT, 10) : 3000;
  await app.listen(port);
  console.log(`Application is running on: http://localhost:${port}`);
}
bootstrap();
