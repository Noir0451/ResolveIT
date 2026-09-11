import {
  Column,
  Entity,
  OneToMany,
} from 'typeorm';

import { User } from '../users/user.entity';
import { BaseEntity } from '../../../common/abstract.entity';

@Entity('roles')
export class Role extends BaseEntity {
  @Column({ type: 'varchar', unique: true })
  name: string;

  @Column({ type: 'text', nullable: true })
  description: string | null;

  @OneToMany(() => User, (user) => user.role)
  users: User[];
}