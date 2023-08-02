import { Module } from '@nestjs/common';
import { ExcelService } from './services/excels.service';
import { ExcelResolver } from './resolvers/excels.resolver';

@Module({
  providers: [ExcelResolver, ExcelService],
  exports: [ExcelService],
})
export class ExcelsModule {}
