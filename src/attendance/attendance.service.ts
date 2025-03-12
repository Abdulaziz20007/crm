import {
  Injectable,
  NotFoundException,
  BadRequestException,
} from '@nestjs/common';
import { CreateAttendanceDto } from './dto/create-attendance.dto';
import { UpdateAttendanceDto } from './dto/update-attendance.dto';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class AttendanceService {
  constructor(private readonly prisma: PrismaService) {}

  async create(createAttendanceDto: CreateAttendanceDto) {
    try {
      const student = await this.prisma.user.findUnique({
        where: { id: createAttendanceDto.student_id },
      });
      if (!student) {
        throw new NotFoundException(
          `${createAttendanceDto.student_id} IDli o'quvchi topilmadi`,
        );
      }

      const lesson = await this.prisma.lesson.findUnique({
        where: { id: createAttendanceDto.lesson_id },
      });
      if (!lesson) {
        throw new NotFoundException(
          `${createAttendanceDto.lesson_id} IDli dars topilmadi`,
        );
      }

      const existingAttendance = await this.prisma.attendance.findFirst({
        where: {
          student_id: createAttendanceDto.student_id,
          lesson_id: createAttendanceDto.lesson_id,
        },
      });

      if (existingAttendance) {
        throw new BadRequestException(
          `Bu o'quvchi allaqachon bu darsda qatnashgan`,
        );
      }

      return this.prisma.attendance.create({
        data: {
          student_id: createAttendanceDto.student_id,
          lesson_id: createAttendanceDto.lesson_id,
          createdAt: createAttendanceDto.date
            ? new Date(createAttendanceDto.date)
            : new Date(),
        },
      });
    } catch (error) {
      if (
        error instanceof NotFoundException ||
        error instanceof BadRequestException
      ) {
        throw error;
      }
      throw new BadRequestException("Noto'g'ri davomat ma'lumoti kiritildi");
    }
  }

  findAll() {
    return this.prisma.attendance.findMany();
  }

  findOne(id: number) {
    return this.prisma.attendance.findUnique({ where: { id } });
  }

  update(id: number, updateAttendanceDto: UpdateAttendanceDto) {
    return this.prisma.attendance.update({
      where: { id },
      data: updateAttendanceDto,
    });
  }

  remove(id: number) {
    return this.prisma.attendance.delete({ where: { id } });
  }
}
