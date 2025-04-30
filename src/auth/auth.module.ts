import { Module, DynamicModule, OnModuleInit } from '@nestjs/common';
import * as SuperTokens from 'supertokens-node';
import Session from 'supertokens-node/recipe/session';
import EmailPassword from 'supertokens-node/recipe/emailpassword';

@Module({})
export class AuthModule implements OnModuleInit {
  static forRoot(): DynamicModule {
    return {
      module: AuthModule,
    };
  }

  async onModuleInit() {
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
      recipeList: [
        EmailPassword.init(),
        Session.init(),
      ],
    });
  }
}
