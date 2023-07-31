import { Injectable, Scope } from '@nestjs/common';
import { InjectConnection, InjectModel } from '@nestjs/mongoose';
import { ObjectId } from 'mongodb';
import { Connection, Model } from 'mongoose';
import { PaginationInput, WhereInput } from 'src/common/common.input';
import { ErrorData } from 'src/error.models';
import { CreateClassInput } from '../dtos/create-class.input';
import { UpdateClassInput } from '../dtos/update-class.input';
import { Classes } from '../entities/classes.entity';

@Injectable({ scope: Scope.DEFAULT })
export class ClassesService {
  constructor(
    @InjectConnection() private connection: Connection,
    @InjectModel(Classes.name) private readonly classModel: Model<Classes>,
  ) {}

  async get(id: string): Promise<Classes> {
    try {
      const clas = await this.classModel.findById(new ObjectId(id)).exec();

      if (!clas) {
        throw ErrorData.Business.material_not_exist;
      }
      return clas;
    } catch (error) {
      throw ErrorData.Business.material_not_exist;
    }
  }

  async getAll(
    pagination?: PaginationInput,
    where?: WhereInput,
  ): Promise<Classes[]> {
    return [];
    // return await this.classModel.aggregate().exec();
  }

  async create(input: CreateClassInput): Promise<Classes> {
    const newClass = new Classes();
    newClass.name = input.name;
    newClass.shortName = input.shortName;
    const createdClass = await this.classModel.create(newClass);
    newClass.id = createdClass.id;
    return newClass;
  }

  async update(input: UpdateClassInput): Promise<Classes> {
    return await this.classModel.create(input);
  }

  async delete(id: String): Promise<number> {
    const a = await this.classModel.deleteOne(id);
    return a.deletedCount;
  }
}
