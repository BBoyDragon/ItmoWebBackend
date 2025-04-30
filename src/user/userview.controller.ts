import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { ApiTags, ApiOperation, ApiResponse, ApiParam, ApiBody } from '@nestjs/swagger';
import { User } from './entities/user.entity';

@ApiTags('Users')
@Controller('user')
export class UserviewController {
  constructor(private readonly userService: UserService) {}

  @Post()
  @ApiOperation({ summary: 'Create a new user' })
  @ApiBody({
    description: 'Data needed to create a user',
    schema: {
      example: {
        username: 'john_doe',
        email: 'john.doe@example.com',
      },
    },
  })
  @ApiResponse({
    status: 201,
    description: 'User created successfully',
    type: User,
    schema: {
      example: {
        id: 1,
        username: 'john_doe',
        email: 'john.doe@example.com',
      },
    },
  })
  create(@Body() createUserDto: CreateUserDto) {
    return this.userService.create(createUserDto);
  }

  @Get()
  @ApiOperation({ summary: 'Get all users' })
  @ApiResponse({
    status: 200,
    description: 'List of users',
    type: [User],
    schema: {
      example: [
        {
          id: 1,
          username: 'john_doe',
          email: 'john.doe@example.com',
        },
      ],
    },
  })
  findAll() {
    return this.userService.findAll();
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get a user by ID' })
  @ApiParam({
    name: 'id',
    type: Number,
    description: 'Unique identifier of the user',
    example: 1,
  })
  @ApiResponse({
    status: 200,
    description: 'User found',
    type: User,
    schema: {
      example: {
        id: 1,
        username: 'john_doe',
        email: 'john.doe@example.com',
      },
    },
  })
  @ApiResponse({ status: 404, description: 'User not found' })
  findOne(@Param('id') id: string) {
    return this.userService.findOne(+id);
  }

  @Patch(':id')
  @ApiOperation({ summary: 'Update a user' })
  @ApiParam({
    name: 'id',
    type: Number,
    description: 'Unique identifier of the user',
    example: 1,
  })
  @ApiBody({
    description: 'Data to update a user',
    schema: {
      example: {
        username: 'john_doe_updated',
        email: 'new.email@example.com',
      },
    },
  })
  @ApiResponse({
    status: 200,
    description: 'User updated successfully',
    type: User,
    schema: {
      example: {
        id: 1,
        username: 'john_doe_updated',
        email: 'new.email@example.com',
      },
    },
  })
  update(
    @Param('id') id: string,
    @Body() updateUserDto: UpdateUserDto,
  ) {
    return this.userService.update(+id, updateUserDto);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Delete a user' })
  @ApiParam({
    name: 'id',
    type: Number,
    description: 'Unique identifier of the user',
    example: 1,
  })
  @ApiResponse({
    status: 200,
    description: 'User deleted successfully',
    type: User,
    schema: {
      example: {
        id: 1,
        username: 'john_doe',
        email: 'john.doe@example.com',
      },
    },
  })
  remove(@Param('id') id: string) {
    return this.userService.remove(+id);
  }
}
