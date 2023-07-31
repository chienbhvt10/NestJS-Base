import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { Classes } from '../entities/classes.entity';
import { ClassesService } from '../services/classes.service';
import { CreateClassInput } from '../dtos/create-class.input';
import { UpdateClassInput } from '../dtos/update-class.input';

@Resolver(() => Classes)
export class ClassesResolver {
  constructor(private readonly classesService: ClassesService) {}

  @Query(() => Classes)
  async getAClass(@Args('id', { type: () => String }) id: string) {
    return await this.classesService.get(id);
  }

  @Query(() => [Classes])
  async getAllClasses() {
    return await this.classesService.getAll();
  }

  @Mutation(() => Classes)
  async createClass(@Args('input') input: CreateClassInput) {
    return await this.classesService.create(input);
  }

  @Mutation(() => Classes)
  async updateClass(@Args('input') input: UpdateClassInput) {
    return await this.classesService.update(input);
  }

  @Mutation(() => Classes)
  async deleteClass(@Args('id', { type: () => String }) id: String) {
    return await this.classesService.delete(id);
  }
}
