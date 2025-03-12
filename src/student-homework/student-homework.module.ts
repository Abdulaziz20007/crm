import { Module } from '@nestjs/common';
import { StudentHomeworkService } from './student-homework.service';
import { StudentHomeworkController } from './student-homework.controller';
import { PrismaModule } from '../prisma/prisma.module';

@Module({
  imports: [PrismaModule],
  controllers: [StudentHomeworkController],
  providers: [StudentHomeworkService],
})
export class StudentHomeworkModule {}
