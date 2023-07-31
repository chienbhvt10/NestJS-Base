import { Module } from '@nestjs/common';
import { ClassesService } from './services/classes.service';
import { ClassesResolver } from './resolvers/classes.resolver';
import { MongooseModule } from '@nestjs/mongoose';
import { Classes, ClassesSchema } from './entities/classes.entity';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Classes.name, schema: ClassesSchema }]),
  ],
  providers: [ClassesService, ClassesResolver],
  exports: [ClassesService],
})
export class ClassesModule {}
