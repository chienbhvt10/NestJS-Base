import { Query, Resolver } from '@nestjs/graphql';
import { Classes } from '../entities/classes.entity';
import { ClassesService } from '../services/classes.service';

@Resolver(() => Classes)
export class ClassesResolver {
  constructor(private readonly classesService: ClassesService) {}
  @Query(() => Classes)
  async getAClass() {
    return await this.classesService.get();
  }

  @Query(() => [Classes])
  async getAllClasses() {
    return await this.classesService.getAll();
  }
}
