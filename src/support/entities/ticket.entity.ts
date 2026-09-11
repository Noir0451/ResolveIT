import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
} from 'typeorm';

import { Category } from './category.entity';
import { User } from '../../auth/entities/user.entity';
import { BaseEntity } from '../../common/abstract.entity';

export enum TicketStatus {
  OPEN = 'OPEN',
  IN_PROGRESS = 'IN_PROGRESS',
  RESOLVED = 'RESOLVED',
  CLOSED = 'CLOSED',
}

export enum TicketPriority {
  LOW = 'LOW',
  MEDIUM = 'MEDIUM',
  HIGH = 'HIGH',
  URGENT = 'URGENT',
}

@Entity('tickets')
export class Ticket extends BaseEntity {
  @Column({ type: 'varchar' })
  title: string;

  @Column({ type: 'text' })
  description: string;

  // @ManyToOne(() => User, (user) => user.createdTickets, {
  //   nullable: false,
  // })
  // @JoinColumn({ name: 'created_by' }) 
  // createdByUser: User;

  @Column({ name: 'assigned_to', type: 'uuid', nullable: true })
  assignedTo: string | null;

  @ManyToOne(() => User, (user) => user.assignedTickets, {
    nullable: true,
  })
  @JoinColumn({ name: 'assigned_to' })
  assignedToUser: User | null;

  @Column({ name: 'assigned_by', type: 'uuid', nullable: true })
  assignedBy: string | null;

  @ManyToOne(() => User, (user) => user.assignedByTickets, {
    nullable: true,
  })
  @JoinColumn({ name: 'assigned_by' })
  assignedByUser: User | null;

  @Column({ name: 'category_id', type: 'uuid' })
  categoryId: string;

  @ManyToOne(() => Category, (category) => category.tickets, {
    nullable: false,
  })
  @JoinColumn({ name: 'category_id' })
  category: Category;

  @Column({
    type: 'enum',
    enum: TicketStatus,
    default: TicketStatus.OPEN,
  })
  status: TicketStatus;

  @Column({
    type: 'enum',
    enum: TicketPriority,
    default: TicketPriority.MEDIUM,
  })
  priority: TicketPriority;
}