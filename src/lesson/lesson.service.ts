import {
  Injectable,
  NotFoundException,
  ForbiddenException,
} from '@nestjs/common';
import { CreateLessonDto } from './dto/create-lesson.dto';
import { UpdateLessonDto } from './dto/update-lesson.dto';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class LessonService {
  constructor(private readonly prisma: PrismaService) {}

  async create(createLessonDto: CreateLessonDto) {
    const user = await this.prisma.user.findUnique({
      where: { id: createLessonDto.teacher_id },
      include: {
        userRoles: {
          include: {
            role: true,
          },
        },
      },
    });

    if (!user) {
      throw new NotFoundException(
        `${createLessonDto.teacher_id} IDli foydalanuvchi topilmadi`,
      );
    }

    const isAuthorized = user.userRoles.some(
      (ur) => ur.role.name === 'ADMIN' || ur.role.name === 'TEACHER',
    );

    if (!isAuthorized) {
      throw new ForbiddenException('Ruxsat berilmagan!');
    }

    const lessonData = {
      group_id: createLessonDto.group_id,
      teacher_id: createLessonDto.teacher_id,
      title: createLessonDto.title,
      homework: createLessonDto.homework,
      xp: createLessonDto.xp,
      is_exam: createLessonDto.is_exam,
      start_time: createLessonDto.start_time,
      end_time: createLessonDto.end_time,
      date: createLessonDto.date || new Date(),
      description: createLessonDto.description,
    };

    return this.prisma.lesson.create({
      data: lessonData,
    });
  }

  findAll() {
    return this.prisma.lesson.findMany({
      include: {
        group: true,
      },
    });
  }

  async findOne(id: number) {
    const lesson = await this.prisma.lesson.findUnique({
      where: { id },
      include: {
        group: true,
        attendances: true,
      },
    });

    if (!lesson) {
      throw new NotFoundException(`${id} IDli dars topilmadi`);
    }

    return lesson;
  }

  async update(id: number, updateLessonDto: UpdateLessonDto) {
    try {
      return await this.prisma.lesson.update({
        where: { id },
        data: updateLessonDto,
      });
    } catch (error) {
      throw new NotFoundException(`${id} IDli dars topilmadi`);
    }
  }

  async remove(id: number) {
    try {
      return await this.prisma.lesson.delete({
        where: { id },
      });
    } catch (error) {
      throw new NotFoundException(`${id} IDli dars topilmadi`);
    }
  }
}
