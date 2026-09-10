import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { Category } from '../../categories/category.entity';
import { User } from '../../users/user.entity';

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
export class Ticket {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'varchar' })
  title: string;

  @Column({ type: 'text' })
  description: string;

  @Column({ name: 'created_by', type: 'int' })
  createdBy: number;

  @ManyToOne(() => User, (user) => user.createdTickets, { nullable: false })
  @JoinColumn({ name: 'created_by' })
  createdByUser: User;

  @Column({ name: 'assigned_to', type: 'int', nullable: true })
  assignedTo: number | null;

  @ManyToOne(() => User, (user) => user.assignedTickets, { nullable: true })
  @JoinColumn({ name: 'assigned_to' })
  assignedToUser: User | null;

  @Column({ name: 'assigned_by', type: 'int', nullable: true })
  assignedBy: number | null;

  @ManyToOne(() => User, (user) => user.assignedByTickets, { nullable: true })
  @JoinColumn({ name: 'assigned_by' })
  assignedByUser: User | null;

  @Column({ name: 'category_id', type: 'int' })
  categoryId: number;

  @ManyToOne(() => Category, (category) => category.tickets, { nullable: false })
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

  @CreateDateColumn({ name: 'created_at', type: 'timestamptz' })
  createdAt: Date;

  @UpdateDateColumn({ name: 'updated_at', type: 'timestamptz' })
  updatedAt: Date;

  @Column({ name: 'updated_by', type: 'int', nullable: true })
  updatedBy: number | null;

  @ManyToOne(() => User, (user) => user.updatedTickets, { nullable: true })
  @JoinColumn({ name: 'updated_by' })
  updatedByUser: User | null;

  @Column({ name: 'deleted_at', type: 'timestamptz', nullable: true })
  deletedAt: Date | null;

  @Column({ name: 'deleted_by', type: 'int', nullable: true })
  deletedBy: number | null;

  @ManyToOne(() => User, (user) => user.deletedTickets, { nullable: true })
  @JoinColumn({ name: 'deleted_by' })
  deletedByUser: User | null;
}