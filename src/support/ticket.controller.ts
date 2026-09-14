import { Controller } from '@nestjs/common';

import { BaseController } from '../common/base/base.controller';
import { Ticket } from './entities/ticket.entity';
import { TicketService } from './ticket.service';

@Controller('tickets')
export class TicketController extends BaseController<Ticket> {
  constructor(
    protected readonly ticketService: TicketService,
  ) {
    super(ticketService);
  }
}