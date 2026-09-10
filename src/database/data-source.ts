import * as path from 'node:path';
import * as dotenv from 'dotenv';
import { DataSource } from 'typeorm';
import { Role } from '../roles/role.entity';
import { User } from '../users/user.entity';
import { Category } from '../categories/category.entity';
import { Ticket } from '../tickets/entities/ticket.entity';

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