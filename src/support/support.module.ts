import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { Category } from './entities/category.entity';
import { Ticket } from './entities/ticket.entity';

import { CategoryController } from './category.controller';
import { TicketController } from './ticket.controller';

import { CategoryService } from './category.service';
import { TicketService } from './ticket.service';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      Category,
      Ticket,
    ]),
  ],

  controllers: [
    CategoryController,
    TicketController,
  ],

  providers: [
    CategoryService,
    TicketService,
  ],

  exports: [
    CategoryService,
    TicketService,
  ],
})
export class SupportModule {}
