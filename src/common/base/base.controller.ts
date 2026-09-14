import {
  Body,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Put,
} from '@nestjs/common';
import { DeepPartial } from 'typeorm';
import { BaseEntity } from '../abstract.entity';
import { BaseService } from './base.service';

export abstract class BaseController<T extends BaseEntity> {
  constructor(
    protected readonly service: BaseService<T>,
  ) {}

  @Post()
  async create(@Body() data: DeepPartial<T>): Promise<T> {
    return this.service.create(data);
  }

  @Get()
  async findAll(): Promise<T[]> {
    return this.service.findAll();
  }

  @Get(':id')
  async findOne(@Param('id') id: string): Promise<T | null> {
    return this.service.findOne(id);
  }

  @Patch(':id')
  async update(
    @Param('id') id: string,
    @Body() data: DeepPartial<T>,
  ) {
    return this.service.update(id, data);
  }

  @Put(':id')
  async upsert(
    @Param('id') id: string,
    @Body() data: DeepPartial<T>,
  ) {
    return this.service.upsert(
      { ...data, id },
      ['id'],
    );
  }

  @Delete(':id')
  async remove(@Param('id') id: string) {
    return this.service.remove(id);
  }

  @Patch(':id/restore')
  async restore(@Param('id') id: string) {
    return this.service.restore(id);
  }

  @Post('bulk')
  async bulkCreate(
    @Body() data: DeepPartial<T>[],
  ) {
    return this.service.bulkCreate(data);
  }

  @Patch('bulk')
  async bulkUpdate(
    @Body()
    body: {
      ids: string[];
      data: DeepPartial<T>;
    },
  ) {
    return this.service.bulkUpdate(
      body.ids,
      body.data,
    );
  }

  @Put('bulk')
  async bulkUpsert(
    @Body() data: DeepPartial<T>[],
  ) {
    return this.service.bulkUpsert(
      data,
      ['id'],
    );
  }

  @Delete('bulk')
  async bulkRemove(
    @Body()
    body: {
      ids: string[];
    },
  ) {
    return this.service.bulkRemove(body.ids);
  }


}