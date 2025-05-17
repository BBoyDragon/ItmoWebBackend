import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UserModule } from './user/user.module';
import { FilmModule } from './film/film.module';
import { TicketModule } from './ticket/ticket.module';
import { FoodModule } from './food/food.module';
import { PrismaModule } from './prisma/prisma.module';
import { FoodOrderModule } from './food-order/food-order.module';
import { GraphQLModule } from '@nestjs/graphql';
import { ApolloDriver, ApolloDriverConfig } from '@nestjs/apollo';
import { join } from 'path';
import { TimingInterceptor } from './interceptors/timing.interceptor';
import { APP_INTERCEPTOR } from '@nestjs/core';
import { ETagInterceptor } from './interceptors/etag.interceptor';
import { AuthModule } from './auth/auth.module';
import {FileStorageModule} from './Infro/file-storage.module'
import { TestingFlagMiddleware } from './IntegrationalTesting/Middlewares/TestingFlagMiddleware';
import { TestingContextService } from './IntegrationalTesting/TestingContextService';
@Module({
  imports: [
    GraphQLModule.forRoot<ApolloDriverConfig>({
      driver: ApolloDriver,
      autoSchemaFile: join(process.cwd(), 'src/schema.gql'),
      playground: true,
    }),
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    FileStorageModule,
    PrismaModule,
    UserModule,
    FilmModule,
    TicketModule,
    FoodModule,
    FoodOrderModule,
    AuthModule,
  ],
  controllers: [AppController],
  providers: [
    {
      provide: APP_INTERCEPTOR,
      useClass: ETagInterceptor,
    }, {
      provide: APP_INTERCEPTOR,
      useClass: TimingInterceptor,
    }, AppService, TestingContextService],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(TestingFlagMiddleware).forRoutes('*');
  }
}