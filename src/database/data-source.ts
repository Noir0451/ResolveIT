import * as path from 'node:path';
import * as dotenv from 'dotenv';
import { DataSource } from 'typeorm';
import { Role } from '../auth/entities/roles/role.entity';
import { User } from '../auth/entities/users/user.entity';
import { Category } from '../support/entities/categories/category.entity';
import { Ticket } from '../support/entities/tickets/entities/ticket.entity';

dotenv.config({ path: path.resolve(process.cwd(), '.env') });

export default new DataSource({
  type: 'postgres',
  host: process.env.DB_HOST ?? 'localhost',
  port: Number(process.env.DB_PORT ?? 5432),
  username: process.env.DB_USERNAME ?? 'postgres',
  password: process.env.DB_PASSWORD ?? 'root',
  database: process.env.DB_DATABASE ?? 'ticket_system',
  entities: [Role, User, Category, Ticket],
  migrations: ['src/database/migrations/*.ts'],
  synchronize: false,
  logging: ['error', 'query'],
});