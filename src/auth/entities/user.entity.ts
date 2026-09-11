import {
  Column,
  Entity,
  Index,
  JoinColumn,
  ManyToOne,
  OneToMany,
} from 'typeorm';

import { Role } from './role.entity';
import { Ticket } from '../../support/entities/ticket.entity';
import { BaseEntity } from '../../common/abstract.entity';

export enum UserType {
  INTERNAL = 'INTERNAL',
  EXTERNAL = 'EXTERNAL',
}

@Entity('users')
export class User extends BaseEntity {
  @Column({ type: 'varchar' })
  name: string;

  @Index('UQ_USERS_EMAIL', { unique: true })
  @Column({ type: 'varchar' })
  email: string;

  @Column({ name: 'password_hash', type: 'varchar' })
  passwordHash: string;

  @Index('UQ_USERS_PHONE', { unique: true })
  @Column({ type: 'varchar', nullable: true })
  phone: string | null;

  @Column({ name: 'role_id', type: 'uuid' })
  roleId: string;

  @ManyToOne(() => Role, (role) => role.users, { nullable: false })
  @JoinColumn({ name: 'role_id' })
  role: Role;

  @Column({
  type: 'enum',
  enum: UserType,
  default: UserType.INTERNAL,
})
  type: UserType;

  @OneToMany(() => Ticket, (ticket) => ticket.assignedToUser)
  assignedTickets: Ticket[];

  @OneToMany(() => Ticket, (ticket) => ticket.assignedByUser)
  assignedByTickets: Ticket[];

  @OneToMany(() => Ticket, (ticket) => ticket.updatedBy)
  updatedTickets: Ticket[];

  @OneToMany(() => Ticket, (ticket) => ticket.deletedBy)
  deletedTickets: Ticket[];

}