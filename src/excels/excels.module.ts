import { Module } from '@nestjs/common';
import { ExcelService } from './excels.service';
import { ExcelResolver } from './excels.resolver';

@Module({
  providers: [ExcelResolver, ExcelService],
  exports: [ExcelService],
})
export class ExcelsModule {}
