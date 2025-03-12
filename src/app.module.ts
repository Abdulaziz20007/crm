import { Module } from '@nestjs/common';
import { CourseModule } from './course/course.module';
import { GroupModule } from './group/group.module';
import { BranchModule } from './branch/branch.module';
import { RegionModule } from './region/region.module';
import { DistrictModule } from './district/district.module';
import { PaymentModule } from './payment/payment.module';
import { PaymentMethodModule } from './payment-method/payment-method.module';
import { GroupTeacherModule } from './group-teacher/group-teacher.module';
import { GroupStudentModule } from './group-student/group-student.module';
import { LessonModule } from './lesson/lesson.module';
import { AttendanceModule } from './attendance/attendance.module';
import { StudentHomeworkModule } from './student-homework/student-homework.module';
import { HomeworkResultModule } from './homework-result/homework-result.module';
import { PrismaModule } from './prisma/prisma.module';
import { AuthModule } from './auth/auth.module';
import { ConfigModule } from '@nestjs/config';
import { UserModule } from './user/user.module';
import { RoleModule } from './role/role.module';
import { UserRoleModule } from './user-role/user-role.module';

@Module({
  imports: [
    CourseModule,
    GroupModule,
    BranchModule,
    RegionModule,
    DistrictModule,
    PaymentModule,
    PaymentMethodModule,
    GroupTeacherModule,
    GroupStudentModule,
    LessonModule,
    AttendanceModule,
    StudentHomeworkModule,
    HomeworkResultModule,
    PrismaModule,
    AuthModule,
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    UserModule,
    RoleModule,
    UserRoleModule,
  ],
})
export class AppModule {}
