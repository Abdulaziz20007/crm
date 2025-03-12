import { Injectable, BadRequestException } from '@nestjs/common';
import { CreateCourseDto } from './dto/create-course.dto';
import { UpdateCourseDto } from './dto/update-course.dto';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class CourseService {
  constructor(private prisma: PrismaService) {}

  async create(createCourseDto: CreateCourseDto) {
    try {
      if (createCourseDto.price <= 0 || createCourseDto.price_per_lesson <= 0) {
        throw new BadRequestException("Narx 0 dan katta bo'lishi kerak");
      }

      if (createCourseDto.capacity <= 0) {
        throw new BadRequestException("Sig'im 0 dan katta bo'lishi kerak");
      }

      if (
        createCourseDto.duration <= 0 ||
        createCourseDto.lesson_quantity <= 0
      ) {
        throw new BadRequestException(
          "Davomiyligi va darslar soni 0 dan katta bo'lishi kerak",
        );
      }

      return await this.prisma.course.create({
        data: createCourseDto,
      });
    } catch (error) {
      if (error instanceof BadRequestException) {
        throw error;
      }
      throw new BadRequestException("Noto'g'ri kurs ma'lumotlari kiritildi");
    }
  }

  async findAll() {
    return this.prisma.course.findMany();
  }

  async findOne(id: number) {
    const course = await this.prisma.course.findUnique({
      where: { id },
    });

    if (!course) {
      throw new BadRequestException(`${id} IDli kurs topilmadi`);
    }

    return course;
  }

  async update(id: number, updateCourseDto: UpdateCourseDto) {
    try {
      return await this.prisma.course.update({
        where: { id },
        data: updateCourseDto,
      });
    } catch (error) {
      throw new BadRequestException(`${id} IDli kurs topilmadi`);
    }
  }

  async remove(id: number) {
    try {
      return await this.prisma.course.delete({
        where: { id },
      });
    } catch (error) {
      throw new BadRequestException(`${id} IDli kurs topilmadi`);
    }
  }
}
