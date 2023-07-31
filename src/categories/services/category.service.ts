import { Injectable, Scope } from '@nestjs/common';
import { Category } from '../entities/category';
import { PaginationInput, WhereInput } from 'src/common/common.input';

@Injectable({ scope: Scope.DEFAULT })
export class CategoryService {
  async get(): Promise<Category> {
    return null;
  }

  async getAll(
    pagination?: PaginationInput,
    where?: WhereInput,
  ): Promise<Category[]> {
    return [];
  }

  async create(): Promise<Boolean> {
    return true;
  }

  async update(): Promise<Boolean> {
    return true;
  }

  async delete(id: String): Promise<Boolean> {
    return true;
  }
}
