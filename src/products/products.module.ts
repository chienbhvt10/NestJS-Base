import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { Product, ProductSchema } from './entities/product';
import { ProductService } from './services/product.service';
import { ProductResolever } from './resolvers/product.resolver';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Product.name, schema: ProductSchema }]),
  ],
  providers: [ProductService, ProductResolever],
  exports: [ProductService],
})
export class ProductsModule {}
