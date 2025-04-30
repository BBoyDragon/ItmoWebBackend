import { Global, Module } from '@nestjs/common';
import { FilmService } from './film.service';
import { FilmController } from './film.controller';
@Global()
@Module({
  controllers: [FilmController],
  providers: [FilmService],
  exports: [FilmService],
})
export class FilmModule {}
