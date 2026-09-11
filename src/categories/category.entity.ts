import {
  Column,
  Entity,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';

import { Ticket } from '../tickets/entities/ticket.entity';
import { BaseEntity } from '../common/abstract.entity';

@Entity('categories')
export class Category extends BaseEntity {
  @Column({ type: 'varchar', unique: true })
  name: string;

  @Column({ type: 'text', nullable: true })
  description: string | null;

  @OneToMany(() => Ticket, (ticket) => ticket.category)
  tickets: Ticket[];
}