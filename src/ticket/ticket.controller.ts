import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { TicketService } from './ticket.service';
import { CreateTicketDto } from './dto/create-ticket.dto';
import { UpdateTicketDto } from './dto/update-ticket.dto';
import { ApiTags, ApiOperation, ApiResponse, ApiParam, ApiBody } from '@nestjs/swagger';
import { Ticket } from './entities/ticket.entity';

@ApiTags('Tickets')
@Controller('api/ticket')
export class TicketController {
  constructor(private readonly ticketService: TicketService) {}

  @Post()
  @ApiOperation({ summary: 'Create a new ticket' })
  @ApiBody({
    description: 'Data needed to create a ticket',
    schema: {
      example: {
        filmId: 1,
        userId: 1,
      },
    },
  })
  @ApiResponse({
    status: 201,
    description: 'Ticket created successfully',
    type: Ticket,
  })
  create(@Body() createTicketDto: CreateTicketDto) {
    return this.ticketService.create(createTicketDto);
  }

  @Get()
  @ApiOperation({ summary: 'Get all tickets' })
  @ApiResponse({
    status: 200,
    description: 'List of tickets',
    type: [Ticket],
  })
  findAll() {
    return this.ticketService.findAll();
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get a ticket by ID' })
  @ApiParam({
    name: 'id',
    type: Number,
    description: 'Unique identifier of the ticket',
    example: 1,
  })
  @ApiResponse({
    status: 200,
    description: 'Ticket found',
    type: Ticket,
  })
  @ApiResponse({ status: 404, description: 'Ticket not found' })
  findOne(@Param('id') id: string) {
    return this.ticketService.findOne(+id);
  }

  @Patch(':id')
  @ApiOperation({ summary: 'Update a ticket' })
  @ApiParam({
    name: 'id',
    type: Number,
    description: 'Unique identifier of the ticket',
    example: 1,
  })
  @ApiBody({
    description: 'Data to update a ticket',
    schema: {
      example: {
        filmId: 1,
        userId: 2,
      },
    },
  })
  update(
    @Param('id') id: string,
    @Body() updateTicketDto: UpdateTicketDto,
  ) {
    return this.ticketService.update(+id, updateTicketDto);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Delete a ticket' })
  @ApiParam({
    name: 'id',
    type: Number,
    description: 'Unique identifier of the ticket',
    example: 1,
  })
  remove(@Param('id') id: string) {
    return this.ticketService.remove(+id);
  }
}
