import { Injectable, Scope } from '@nestjs/common';
import { InjectConnection } from '@nestjs/mongoose';
import { Connection } from 'mongoose';
import { Classes } from '../entities/classes.entity';
import { PaginationInput, WhereInput } from 'src/common/common.input';
import { CreateClassInput } from '../dtos/create-class.input';
import { UpdateClassInput } from '../dtos/update-class.input';

@Injectable({ scope: Scope.DEFAULT })
export class ClassesService {
  //   constructor(@InjectConnection() private connection: Connection) {}
  async get(): Promise<Classes> {
    return { id: '1', shortName: 'class 1', name: 'class 1' };
  }

  async getAll(
    pagination?: PaginationInput,
    where?: WhereInput,
  ): Promise<Classes[]> {
    return [
      { id: '1', shortName: 'class 1', name: 'class 1' },
      { id: '2', shortName: 'class 2', name: 'class 2' },
    ];
  }

  async create(input: CreateClassInput): Promise<Boolean> {
    return true;
  }

  async update(input: UpdateClassInput): Promise<Boolean> {
    return true;
  }

  async delete(id: String): Promise<Boolean> {
    return true;
  }
}
