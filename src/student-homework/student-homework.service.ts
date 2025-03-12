import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateStudentHomeworkDto } from './dto/create-student-homework.dto';
import { UpdateStudentHomeworkDto } from './dto/update-student-homework.dto';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class StudentHomeworkService {
  constructor(private readonly prisma: PrismaService) {}

  create(createStudentHomeworkDto: CreateStudentHomeworkDto) {
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
      throw new NotFoundException(`StudentHomework with ID ${id} not found`);
    }

    return studentHomework;
  }

  async update(id: number, updateStudentHomeworkDto: UpdateStudentHomeworkDto) {
    try {
      return await this.prisma.studentHomework.update({
        where: { id },
        data: updateStudentHomeworkDto,
      });
    } catch (error) {
      throw new NotFoundException(`StudentHomework with ID ${id} not found`);
    }
  }

  async remove(id: number) {
    try {
      return await this.prisma.studentHomework.delete({
        where: { id },
      });
    } catch (error) {
      throw new NotFoundException(`StudentHomework with ID ${id} not found`);
    }
  }
}
