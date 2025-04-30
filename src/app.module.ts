import {Module} from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import {AppController} from './app.controller';
import {AppService} from './app.service';
import { UserModule } from './user/user.module';
import { FilmModule } from './film/film.module';
import { TicketModule } from './ticket/ticket.module';
import { FoodModule } from './food/food.module';
import { PrismaModule } from './prisma/prisma.module';
import { FoodOrderModule } from './food-order/food-order.module';
import { GraphQLModule } from '@nestjs/graphql';
import { ApolloDriver, ApolloDriverConfig } from '@nestjs/apollo';
import { join } from 'path';

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
        PrismaModule,
        UserModule,
        FilmModule,
        TicketModule,
        FoodModule,
        FoodOrderModule,
    ],
    controllers: [AppController],
    providers: [AppService],
})
export class AppModule {
}
