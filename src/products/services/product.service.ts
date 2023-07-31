import { Injectable, Scope } from '@nestjs/common';
import { PaginationInput, WhereInput } from 'src/common/common.input';
import { Product } from '../entities/product';

@Injectable({ scope: Scope.DEFAULT })
export class ProductService {
  async get(): Promise<Product> {
    return null;
  }

  async getAll(
    pagination?: PaginationInput,
    where?: WhereInput,
  ): Promise<Product[]> {
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
