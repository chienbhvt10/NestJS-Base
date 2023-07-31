import { Mutation, Query, Resolver } from '@nestjs/graphql';
import { ProductService } from '../services/product.service';
import { Product } from '../entities/product';

@Resolver()
export class ProductResolever {
  constructor(private readonly productService: ProductService) {}

  @Query(() => Product)
  async getProduct(): Promise<Product> {
    return this.productService.get();
  }

  @Query(() => [Product])
  async getProducts(): Promise<Product[]> {
    return this.productService.getAll();
  }

  @Mutation(() => Boolean)
  async updateProduct(): Promise<Boolean> {
    return this.productService.update();
  }

  @Mutation(() => Boolean)
  async createProduct(): Promise<Boolean> {
    return this.productService.create();
  }

  @Mutation(() => Boolean)
  async deleteProduct(id: String): Promise<Boolean> {
    return this.productService.delete(id);
  }
}
