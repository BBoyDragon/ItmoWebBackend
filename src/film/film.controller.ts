import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  NotFoundException,
} from '@nestjs/common';
import {
  ApiTags,
  ApiOperation,
  ApiResponse,
  ApiParam,
  ApiBody,
} from '@nestjs/swagger';
import { FilmService } from './film.service';
import { CreateFilmDto } from './dto/create-film.dto';
import { UpdateFilmDto } from './dto/update-film.dto';
import { Film } from './entities/film.entity';

@ApiTags('Films')
@Controller('film')
export class FilmController {
  constructor(private readonly filmService: FilmService) {
  }

  @Post()
  @ApiOperation({ summary: 'Create a new film' })
  @ApiBody({
    description: 'Data needed to create a film',
    schema: {
      example: {
        name: 'Inception',
        status: 'Created',
      },
    },
  })
  @ApiResponse({
    status: 201,
    description: 'Film created successfully',
    type: Film,
    schema: {
      example: {
        id: 1,
        name: 'Inception',
        status: 'Created',
        tickets: [],
      },
    },
  })
  create(@Body() createFilmDto: CreateFilmDto): Promise<Film> {
    return this.filmService.create(createFilmDto);
  }

  @Get()
  @ApiOperation({ summary: 'Get all films' })
  @ApiResponse({
    status: 200,
    description: 'List of films',
    type: [Film],
    schema: {
      example: [
        {
          id: 1,
          name: 'Inception',
          status: 'Approved',
          tickets: [],
        },
      ],
    },
  })
  findAll(): Promise<Film[]> {
    return this.filmService.findAll();
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get a film by ID' })
  @ApiParam({
    name: 'id',
    type: Number,
    description: 'Unique identifier of the film',
    example: 1,
  })
  @ApiResponse({
    status: 200,
    description: 'Film found',
    type: Film,
    schema: {
      example: {
        id: 1,
        name: 'Inception',
        status: 'Approved',
        tickets: [],
      },
    },
  })
  @ApiResponse({ status: 404, description: 'Film not found' })
  async findOne(@Param('id') id: string): Promise<Film> {
    const film = await this.filmService.findOne(+id);
    if (!film) {
      throw new NotFoundException(`Film with id ${id} not found`);
    }
    return film;
  }

  @Patch(':id')
  @ApiOperation({ summary: 'Update a film by ID' })
  @ApiParam({
    name: 'id',
    type: Number,
    description: 'Unique identifier of the film',
    example: 1,
  })
  @ApiBody({
    description: 'Data to update a film',
    schema: {
      example: {
        name: 'Inception Updated',
        status: 'Process',
      },
    },
  })
  @ApiResponse({
    status: 200,
    description: 'Film updated successfully',
    type: Film,
    schema: {
      example: {
        id: 1,
        name: 'Inception Updated',
        status: 'Process',
        tickets: [],
      },
    },
  })
  update(
    @Param('id') id: string,
    @Body() updateFilmDto: UpdateFilmDto,
  ): Promise<Film> {
    return this.filmService.update(+id, updateFilmDto);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Delete a film by ID' })
  @ApiParam({
    name: 'id',
    type: Number,
    description: 'Unique identifier of the film',
    example: 1,
  })
  @ApiResponse({
    status: 200,
    description: 'Film deleted successfully',
    type: Film,
    schema: {
      example: {
        id: 1,
        name: 'Inception',
        status: 'Approved',
        tickets: [],
      },
    },
  })
  remove(@Param('id') id: string): Promise<Film> {
    return this.filmService.remove(+id);
  }
}
