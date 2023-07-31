import { Mutation, Query, Resolver } from '@nestjs/graphql';
import { CategoryService } from '../services/category.service';
import { Category } from '../entities/category';

@Resolver()
export class CategoryResolver {
  constructor(private readonly categoryService: CategoryService) {}

  @Query()
  async getCategory(): Promise<Category> {
    return this.categoryService.get();
  }

  @Query()
  async getCategories(): Promise<Category[]> {
    return this.categoryService.getAll();
  }

  @Mutation()
  async createCategory(): Promise<Boolean> {
    return this.categoryService.create();
  }

  @Mutation()
  async updateCategory(): Promise<Boolean> {
    return this.categoryService.update();
  }

  @Mutation()
  async deleteCategory(id: String): Promise<Boolean> {
    return this.categoryService.delete(id);
  }
}
