import { Module } from '@nestjs/common';
import { GroupStudentService } from './group-student.service';
import { GroupStudentController } from './group-student.controller';
import { PrismaModule } from '../prisma/prisma.module';

@Module({
  imports: [PrismaModule],
  controllers: [GroupStudentController],
  providers: [GroupStudentService],
})
export class GroupStudentModule {}
