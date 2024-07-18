import { Global, Module } from '@nestjs/common';
import { PrismaService } from './service';

@Global()
@Module({
  imports: [],
  providers: [PrismaService],
  exports: [PrismaService],
})
export class GlobalNestModule {}
