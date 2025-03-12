import {
  Injectable,
  NotFoundException,
  BadRequestException,
} from '@nestjs/common';
import { CreateGroupStudentDto } from './dto/create-group-student.dto';
import { UpdateGroupStudentDto } from './dto/update-group-student.dto';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class GroupStudentService {
  constructor(private readonly prisma: PrismaService) {}

  async create(createGroupStudentDto: CreateGroupStudentDto) {
    try {
      if (
        !createGroupStudentDto.student_id ||
        !createGroupStudentDto.group_id
      ) {
        throw new BadRequestException(
          "Student ID va Guruh ID kiritilishi shart",
        );
      }

      const student = await this.prisma.user.findUnique({
        where: { id: createGroupStudentDto.student_id },
        include: {
          userRoles: {
            include: {
              role: true,
            },
          },
        },
      });

      if (!student) {
        throw new NotFoundException(
          `${createGroupStudentDto.student_id} IDli student topilmadi`,
        );
      }

      const isStudent = student.userRoles.some(
        (ur) => ur.role.name === 'STUDENT',
      );
      if (!isStudent) {
        throw new BadRequestException(
          `${createGroupStudentDto.student_id} IDli foydalanuvchi student emas`,
        );
      }

      const group = await this.prisma.group.findUnique({
        where: { id: createGroupStudentDto.group_id },
      });

      if (!group) {
        throw new NotFoundException(
          `${createGroupStudentDto.group_id} IDli guruh topilmadi`,
        );
      }

      const existingAssignment = await this.prisma.groupStudent.findFirst({
        where: {
          student_id: createGroupStudentDto.student_id,
          group_id: createGroupStudentDto.group_id,
        },
      });

      if (existingAssignment) {
        throw new BadRequestException(
          `${createGroupStudentDto.student_id} IDli student allaqachon ${createGroupStudentDto.group_id} IDli guruhga biriktirilgan`,
        );
      }

      const groupStudent = await this.prisma.groupStudent.create({
        data: createGroupStudentDto,
        include: {
          student: true,
          group: true,
        },
      });

      const { password, refreshToken, ...studentWithoutSensitiveData } =
        groupStudent.student;

      return {
        ...groupStudent,
        student: {
          ...studentWithoutSensitiveData,
          phone: groupStudent.student.phone?.toString(),
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
        "Noto'g'ri guruh student ma'lumoti kiritildi",
      );
    }
  }

  async findAll() {
    const groupStudents = await this.prisma.groupStudent.findMany({
      include: {
        student: true,
        group: true,
      },
    });

    return groupStudents.map((gs) => {
      const { password, refreshToken, ...studentWithoutSensitiveData } =
        gs.student;
      return {
        ...gs,
        student: {
          ...studentWithoutSensitiveData,
          phone: gs.student.phone?.toString(),
        },
      };
    });
  }

  async findOne(id: number) {
    const groupStudent = await this.prisma.groupStudent.findUnique({
      where: { id },
      include: {
        student: true,
        group: true,
      },
    });

    if (!groupStudent) {
      throw new NotFoundException(`${id} IDli guruh student topilmadi`);
    }

    const { password, refreshToken, ...studentWithoutSensitiveData } =
      groupStudent.student;

    return {
      ...groupStudent,
      student: {
        ...studentWithoutSensitiveData,
        phone: groupStudent.student.phone?.toString(),
      },
    };
  }

  async update(id: number, updateGroupStudentDto: UpdateGroupStudentDto) {
    try {
      const groupStudent = await this.prisma.groupStudent.update({
        where: { id },
        data: updateGroupStudentDto,
        include: {
          student: true,
          group: true,
        },
      });

      const { password, refreshToken, ...studentWithoutSensitiveData } =
        groupStudent.student;

      return {
        ...groupStudent,
        student: {
          ...studentWithoutSensitiveData,
          phone: groupStudent.student.phone?.toString(),
        },
      };
    } catch (error) {
      throw new NotFoundException(`${id} IDli guruh student topilmadi`);
    }
  }

  async remove(id: number) {
    try {
      const groupStudent = await this.prisma.groupStudent.delete({
        where: { id },
        include: {
          student: true,
          group: true,
        },
      });

      const { password, refreshToken, ...studentWithoutSensitiveData } =
        groupStudent.student;

      return {
        ...groupStudent,
        student: {
          ...studentWithoutSensitiveData,
          phone: groupStudent.student.phone?.toString(),
        },
      };
    } catch (error) {
      throw new NotFoundException(`${id} IDli guruh student topilmadi`);
    }
  }
}
