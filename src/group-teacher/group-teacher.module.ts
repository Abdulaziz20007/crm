import { Module } from '@nestjs/common';
import { GroupTeacherService } from './group-teacher.service';
import { GroupTeacherController } from './group-teacher.controller';
import { PrismaModule } from 'src/prisma/prisma.module';

@Module({
  imports: [PrismaModule],
  controllers: [GroupTeacherController],
  providers: [GroupTeacherService],
})
export class GroupTeacherModule {}
