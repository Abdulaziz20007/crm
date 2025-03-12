import { Module } from '@nestjs/common';
import { HomeworkResultService } from './homework-result.service';
import { HomeworkResultController } from './homework-result.controller';
import { PrismaModule } from '../prisma/prisma.module';

@Module({
  imports: [PrismaModule],
  controllers: [HomeworkResultController],
  providers: [HomeworkResultService],
})
export class HomeworkResultModule {}
