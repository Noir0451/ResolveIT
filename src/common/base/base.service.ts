import {
  DeepPartial,
  DeleteResult,
  Repository,
  UpdateResult,
  InsertResult,
} from 'typeorm';

import { BaseEntity } from '../abstract.entity';

export abstract class BaseService<T extends BaseEntity> {
  constructor(
    protected readonly repository: Repository<T>,
  ) {}

  async create(data: DeepPartial<T>): Promise<T> {
  const entity = this.repository.create(data);
  return this.repository.save(entity);
  }

  async findAll(): Promise<T[]> {
    return this.repository.find();
  }

  async findOne(id: string): Promise<T | null> {
    return this.repository.findOne({
      where: { id } as any,
    });
  }

  async update(
    id: string,
    data: DeepPartial<T>,
  ): Promise<UpdateResult> {
    return this.repository.update(id, data as any);
  }

  async upsert(
    data: DeepPartial<T>,
    conflictPaths: string[],
  ): Promise<InsertResult> {
    return this.repository.upsert(
      data as any,
      conflictPaths,
    );
  }

  async remove(id: string): Promise<DeleteResult> {
    return this.repository.softDelete(id);
  }

  async restore(id: string): Promise<UpdateResult> {
    return this.repository.restore(id);
  }

  async bulkCreate(
    data: DeepPartial<T>[],
  ): Promise<T[]> {
    const entities = this.repository.create(data);
    return this.repository.save(entities);
  }

  async bulkUpdate(
    ids: string[],
    data: DeepPartial<T>,
  ): Promise<UpdateResult> {
    return this.repository.update(ids, data as any);
  }

  async bulkUpsert(
    data: DeepPartial<T>[],
    conflictPaths: string[],
  ): Promise<InsertResult> {
    return this.repository.upsert(
      data as any,
      conflictPaths,
    );
  }

  async bulkRemove(
    ids: string[],
  ): Promise<DeleteResult> {
    return this.repository.softDelete(ids);
  }


}