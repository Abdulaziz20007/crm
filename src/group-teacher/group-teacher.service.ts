import {
  Injectable,
  NotFoundException,
  BadRequestException,
} from '@nestjs/common';
import { CreateGroupTeacherDto } from './dto/create-group-teacher.dto';
import { UpdateGroupTeacherDto } from './dto/update-group-teacher.dto';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class GroupTeacherService {
  constructor(private prisma: PrismaService) {}

  async create(createGroupTeacherDto: CreateGroupTeacherDto) {
    try {
      if (
        !createGroupTeacherDto.teacher_id ||
        !createGroupTeacherDto.group_id
      ) {
        throw new BadRequestException(
          "O'qituvchi ID va Guruh ID kiritilishi shart",
        );
      }

      if (createGroupTeacherDto.duration <= 0) {
        throw new BadRequestException("Davomiylik 0 dan katta bo'lishi kerak");
      }

      if (
        createGroupTeacherDto.start_month < 1 ||
        createGroupTeacherDto.start_month > 12
      ) {
        throw new BadRequestException(
          "Boshlanish oyi 1 va 12 oralig'ida bo'lishi kerak",
        );
      }

      const teacher = await this.prisma.user.findUnique({
        where: { id: createGroupTeacherDto.teacher_id },
        include: {
          userRoles: {
            include: {
              role: true,
            },
          },
        },
      });

      if (!teacher) {
        throw new NotFoundException(
          `${createGroupTeacherDto.teacher_id} IDli o\'qituvchi topilmadi`,
        );
      }

      const isTeacher = teacher.userRoles.some(
        (ur) => ur.role.name === 'TEACHER',
      );
      if (!isTeacher) {
        throw new BadRequestException(
          `${createGroupTeacherDto.teacher_id} IDli foydalanuvchi o\'qituvchi emas`,
        );
      }

      const group = await this.prisma.group.findUnique({
        where: { id: createGroupTeacherDto.group_id },
      });

      if (!group) {
        throw new NotFoundException(
          `${createGroupTeacherDto.group_id} IDli guruh topilmadi`,
        );
      }

      const existingAssignment = await this.prisma.groupTeacher.findFirst({
        where: {
          teacher_id: createGroupTeacherDto.teacher_id,
          group_id: createGroupTeacherDto.group_id,
        },
      });

      if (existingAssignment) {
        throw new BadRequestException(
          `${createGroupTeacherDto.teacher_id} IDli o'qituvchi allaqachon ${createGroupTeacherDto.group_id} IDli guruhga biriktirilgan`,
        );
      }

      const groupTeacher = await this.prisma.groupTeacher.create({
        data: createGroupTeacherDto,
        include: {
          teacher: true,
          group: true,
        },
      });

      const { password, refreshToken, ...teacherWithoutSensitiveData } =
        groupTeacher.teacher;

      return {
        ...groupTeacher,
        teacher: {
          ...teacherWithoutSensitiveData,
          phone: groupTeacher.teacher.phone?.toString(),
        },
      };
    } catch (error) {
      if (
        error instanceof NotFoundException ||
        error instanceof BadRequestException
      ) {
        throw error;
      }
      throw new BadRequestException(
        "Noto'g'ri guruh o'qituvchisi ma'lumoti kiritildi",
      );
    }
  }

  async findAll() {
    const groupTeachers = await this.prisma.groupTeacher.findMany({
      include: {
        teacher: true,
        group: true,
      },
    });

    return groupTeachers.map((gt) => {
      const { password, refreshToken, ...teacherWithoutSensitiveData } =
        gt.teacher;
      return {
        ...gt,
        teacher: {
          ...teacherWithoutSensitiveData,
          phone: gt.teacher.phone?.toString(),
        },
      };
    });
  }

  async findOne(id: number) {
    const groupTeacher = await this.prisma.groupTeacher.findUnique({
      where: { id },
      include: {
        teacher: true,
        group: true,
      },
    });

    if (!groupTeacher) {
      throw new NotFoundException(`${id} IDli guruh o\'qituvchisi topilmadi`);
    }

    const { password, refreshToken, ...teacherWithoutSensitiveData } =
      groupTeacher.teacher;

    return {
      ...groupTeacher,
      teacher: {
        ...teacherWithoutSensitiveData,
        phone: groupTeacher.teacher.phone?.toString(),
      },
    };
  }

  async update(id: number, updateGroupTeacherDto: UpdateGroupTeacherDto) {
    try {
      const groupTeacher = await this.prisma.groupTeacher.update({
        where: { id },
        data: updateGroupTeacherDto,
        include: {
          teacher: true,
          group: true,
        },
      });

      const { password, refreshToken, ...teacherWithoutSensitiveData } =
        groupTeacher.teacher;

      return {
        ...groupTeacher,
        teacher: {
          ...teacherWithoutSensitiveData,
          phone: groupTeacher.teacher.phone?.toString(),
        },
      };
    } catch (error) {
      throw new NotFoundException(`${id} IDli guruh o'qituvchisi topilmadi`);
    }
  }

  async remove(id: number) {
    try {
      const groupTeacher = await this.prisma.groupTeacher.delete({
        where: { id },
        include: {
          teacher: true,
          group: true,
        },
      });

      const { password, refreshToken, ...teacherWithoutSensitiveData } =
        groupTeacher.teacher;

      return {
        ...groupTeacher,
        teacher: {
          ...teacherWithoutSensitiveData,
          phone: groupTeacher.teacher.phone?.toString(),
        },
      };
    } catch (error) {
      throw new NotFoundException(`${id} IDli guruh o\'qituvchisi topilmadi`);
    }
  }
}
