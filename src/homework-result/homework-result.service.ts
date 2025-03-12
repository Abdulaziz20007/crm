import {
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { CreateHomeworkResultDto } from './dto/create-homework-result.dto';
import { UpdateHomeworkResultDto } from './dto/update-homework-result.dto';
import { PrismaService } from '../prisma/prisma.service';
import { Request } from 'express';
import { User } from '@prisma/client';

@Injectable()
export class HomeworkResultService {
  constructor(private readonly prisma: PrismaService) {}

  private calculateXp(ball: number, lessonExp: number): number {
    const percentage = ball / 100;
    const rawXp = lessonExp * percentage;
    return rawXp % 1 >= 0.5 ? Math.ceil(rawXp) : Math.floor(rawXp);
  }

  async create(
    createHomeworkResultDto: CreateHomeworkResultDto,
    request: Request,
  ) {
    if ('user' in request) {
      const user = request.user as User;
      if (user.id !== createHomeworkResultDto.teacher_id) {
        throw new UnauthorizedException("Ruxsat yo'q");
      }
    }

    const studentHomework = await this.prisma.studentHomework.findUnique({
      where: { id: createHomeworkResultDto.student_homework_id },
      include: { lesson: true },
    });

    if (!studentHomework) {
      throw new NotFoundException(
        `${createHomeworkResultDto.student_homework_id} IDli student uy ishi topilmadi`,
      );
    }

    const xp = this.calculateXp(
      createHomeworkResultDto.ball,
      studentHomework.lesson.xp,
    );

    return this.prisma.homeworkResult.create({
      data: {
        ...createHomeworkResultDto,
        xp,
        createdAt: new Date(),
      },
    });
  }

  findAll() {
    return this.prisma.homeworkResult.findMany({
      include: {
        studentHomework: {
          include: {
            student: true,
            lesson: true,
          },
        },
        teacher: true,
      },
    });
  }

  async findOne(id: number) {
    const homeworkResult = await this.prisma.homeworkResult.findUnique({
      where: { id },
      include: {
        studentHomework: {
          include: {
            student: true,
            lesson: true,
          },
        },
        teacher: true,
      },
    });

    if (!homeworkResult) {
      throw new NotFoundException(`HomeworkResult with ID ${id} not found`);
    }

    return homeworkResult;
  }

  async update(
    id: number,
    updateHomeworkResultDto: UpdateHomeworkResultDto,
    request: Request,
  ) {
    if ('user' in request) {
      const user = request.user as User;
      const homeworkResult = await this.prisma.homeworkResult.findUnique({
        where: { id },
      });
      if (!homeworkResult) {
        throw new NotFoundException(`HomeworkResult with ID ${id} not found`);
      }
      if (user.id !== homeworkResult.teacher_id) {
        throw new UnauthorizedException("Ruxsat yo'q");
      }
    }

    try {
      return await this.prisma.homeworkResult.update({
        where: { id },
        data: updateHomeworkResultDto,
      });
    } catch (error) {
      throw new NotFoundException(`HomeworkResult with ID ${id} not found`);
    }
  }

  async remove(id: number, request: Request) {
    if ('user' in request) {
      const user = request.user as User;
      const homeworkResult = await this.prisma.homeworkResult.findUnique({
        where: { id },
      });
      if (!homeworkResult) {
        throw new NotFoundException(`HomeworkResult with ID ${id} not found`);
      }
      if (user.id !== homeworkResult.teacher_id) {
        throw new UnauthorizedException("Ruxsat yo'q");
      }
    }

    try {
      return await this.prisma.homeworkResult.delete({
        where: { id },
      });
    } catch (error) {
      throw new NotFoundException(`HomeworkResult with ID ${id} not found`);
    }
  }
}
