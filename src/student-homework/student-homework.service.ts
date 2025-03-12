import {
  Injectable,
  NotFoundException,
  ConflictException,
  UnauthorizedException,
} from '@nestjs/common';
import { CreateStudentHomeworkDto } from './dto/create-student-homework.dto';
import { UpdateStudentHomeworkDto } from './dto/update-student-homework.dto';
import { PrismaService } from '../prisma/prisma.service';
import { Request } from 'express';
import { User } from '@prisma/client';

@Injectable()
export class StudentHomeworkService {
  constructor(private readonly prisma: PrismaService) {}

  async create(
    createStudentHomeworkDto: CreateStudentHomeworkDto,
    request: Request,
  ) {
    if ('user' in request) {
      const user = request.user as User;
      if (user.id !== createStudentHomeworkDto.student_id) {
        throw new UnauthorizedException("Ruxsat yo'q");
      }
    }

    const existingHomework = await this.prisma.studentHomework.findFirst({
      where: {
        student_id: createStudentHomeworkDto.student_id,
        lesson_id: createStudentHomeworkDto.lesson_id,
      },
    });

    if (existingHomework) {
      throw new ConflictException('Uy ishi avval topshirilgan');
    }

    return this.prisma.studentHomework.create({
      data: createStudentHomeworkDto,
    });
  }

  findAll() {
    return this.prisma.studentHomework.findMany({
      include: {
        student: true,
        lesson: true,
      },
    });
  }

  async findOne(id: number) {
    const studentHomework = await this.prisma.studentHomework.findUnique({
      where: { id },
      include: {
        student: true,
        lesson: true,
      },
    });

    if (!studentHomework) {
      throw new NotFoundException(`Uy ishi topilmadi`);
    }

    return studentHomework;
  }

  async update(
    id: number,
    updateStudentHomeworkDto: UpdateStudentHomeworkDto,
    request: Request,
  ) {
    if ('user' in request) {
      const user = request.user as User;
      const homework = await this.prisma.studentHomework.findUnique({
        where: { id },
      });
      if (!homework) {
        throw new NotFoundException(`Uy ishi topilmadi`);
      }
      if (user.id !== homework.student_id) {
        throw new UnauthorizedException("Ruxsat yo'q");
      }
    }

    try {
      return await this.prisma.studentHomework.update({
        where: { id },
        data: updateStudentHomeworkDto,
      });
    } catch (error) {
      throw new NotFoundException(`Uy ishi topilmadi`);
    }
  }

  async remove(id: number, request: Request) {
    if ('user' in request) {
      const user = request.user as User;
      const homework = await this.prisma.studentHomework.findUnique({
        where: { id },
      });
      if (!homework) {
        throw new NotFoundException(`Uy ishi topilmadi`);
      }
      if (user.id !== homework.student_id) {
        throw new UnauthorizedException("Ruxsat yo'q");
      }
    }

    try {
      return await this.prisma.studentHomework.delete({
        where: { id },
      });
    } catch (error) {
      throw new NotFoundException(`Uy ishi topilmadi`);
    }
  }
}
