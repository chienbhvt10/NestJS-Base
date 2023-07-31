import { Mutation, Query, Resolver } from '@nestjs/graphql';
import { ProductService } from '../services/product.service';
import { Product } from '../entities/product';

@Resolver()
export class ProductResolever {
  constructor(private readonly productService: ProductService) {}

  @Query()
  async getProduct(): Promise<Product> {
    return this.productService.get();
  }

  @Query()
  async getProducts(): Promise<Product[]> {
    return this.productService.getAll();
  }

  @Mutation()
  async updateProduct(): Promise<Boolean> {
    return this.productService.update();
  }

  @Mutation()
  async createProduct(): Promise<Boolean> {
    return this.productService.create();
  }

  @Mutation()
  async deleteProduct(id: String): Promise<Boolean> {
    return this.productService.delete(id);
  }
}
