import {
  Column,
  CreateDateColumn,
  Entity,
  Index,
  JoinColumn,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { Role } from '../roles/role.entity';
import { Ticket } from '../tickets/entities/ticket.entity';

@Entity('users')
export class User {
  @PrimaryGeneratedColumn()
  id: number;

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

  @Column({ name: 'role_id', type: 'int' })
  roleId: number;

  @ManyToOne(() => Role, (role) => role.users, { nullable: false })
  @JoinColumn({ name: 'role_id' })
  role: Role;

  @CreateDateColumn({ name: 'created_at', type: 'timestamptz' })
  createdAt: Date;

  @UpdateDateColumn({ name: 'updated_at', type: 'timestamptz' })
  updatedAt: Date;

  @Column({ name: 'created_by', type: 'int', nullable: true })
  createdBy: number | null;

  @ManyToOne(() => User, (user) => user.createdUsers, { nullable: true })
  @JoinColumn({ name: 'created_by' })
  creator: User | null;

  @Column({ name: 'updated_by', type: 'int', nullable: true })
  updatedBy: number | null;

  @ManyToOne(() => User, (user) => user.updatedUsers, { nullable: true })
  @JoinColumn({ name: 'updated_by' })
  updater: User | null;

  @Column({ name: 'deleted_at', type: 'timestamptz', nullable: true })
  deletedAt: Date | null;

  @Column({ name: 'deleted_by', type: 'int', nullable: true })
  deletedBy: number | null;

  @ManyToOne(() => User, (user) => user.deletedUsers, { nullable: true })
  @JoinColumn({ name: 'deleted_by' })
  deleter: User | null;

  @OneToMany(() => Ticket, (ticket) => ticket.createdByUser)
  createdTickets: Ticket[];

  @OneToMany(() => Ticket, (ticket) => ticket.assignedToUser)
  assignedTickets: Ticket[];

  @OneToMany(() => Ticket, (ticket) => ticket.assignedByUser)
  assignedByTickets: Ticket[];

  @OneToMany(() => Ticket, (ticket) => ticket.updatedByUser)
  updatedTickets: Ticket[];

  @OneToMany(() => Ticket, (ticket) => ticket.deletedByUser)
  deletedTickets: Ticket[];

  @OneToMany(() => User, (user) => user.creator)
  createdUsers: User[];

  @OneToMany(() => User, (user) => user.updater)
  updatedUsers: User[];

  @OneToMany(() => User, (user) => user.deleter)
  deletedUsers: User[];
}
