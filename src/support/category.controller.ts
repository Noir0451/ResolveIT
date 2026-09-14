import { Controller } from '@nestjs/common';

import { BaseController } from '../common/base/base.controller';
import { Category } from './entities/category.entity';
import { CategoryService } from './category.service';

@Controller('categories')
export class CategoryController extends BaseController<Category> {
  constructor(
    protected readonly categoryService: CategoryService,
  ) {
    super(categoryService);
  }
}