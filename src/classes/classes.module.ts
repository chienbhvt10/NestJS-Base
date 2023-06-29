import { Module } from '@nestjs/common';
import { ClassesService } from './services/classes.service';
import { ClassesResolver } from './resolvers/classes.resolver';

@Module({
  providers: [ClassesService, ClassesResolver],
  exports: [ClassesService],
})
export class ClassesModule {}
