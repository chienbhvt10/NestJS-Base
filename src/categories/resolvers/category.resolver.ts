import { Mutation, Query, Resolver } from '@nestjs/graphql';
import { CategoryService } from '../services/category.service';
import { Category } from '../entities/category';

@Resolver()
export class CategoryResolver {
  constructor(private readonly categoryService: CategoryService) {}

  @Query(() => Category)
  async getCategory(): Promise<Category> {
    return this.categoryService.get();
  }

  @Query(() => [Category])
  async getCategories(): Promise<Category[]> {
    return this.categoryService.getAll();
  }

  @Mutation(() => Boolean)
  async createCategory(): Promise<Boolean> {
    return this.categoryService.create();
  }

  @Mutation(() => Boolean)
  async updateCategory(): Promise<Boolean> {
    return this.categoryService.update();
  }

  @Mutation(() => Boolean)
  async deleteCategory(id: String): Promise<Boolean> {
    return this.categoryService.delete(id);
  }
}
