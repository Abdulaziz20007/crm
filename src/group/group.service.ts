import {
  Injectable,
  BadRequestException,
  NotFoundException,
} from '@nestjs/common';
import { CreateGroupDto } from './dto/create-group.dto';
import { UpdateGroupDto } from './dto/update-group.dto';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class GroupService {
  constructor(private readonly prisma: PrismaService) {}

  async create(createGroupDto: CreateGroupDto) {
    try {
      const course = await this.prisma.course.findUnique({
        where: { id: createGroupDto.course_id },
      });
      if (!course) {
        throw new NotFoundException(
          `Course with ID ${createGroupDto.course_id} not found`,
        );
      }

      const branch = await this.prisma.branch.findUnique({
        where: { id: createGroupDto.branch_id },
      });
      if (!branch) {
        throw new NotFoundException(
          `Branch with ID ${createGroupDto.branch_id} not found`,
        );
      }


      const invalidDays = createGroupDto.lesson_days.filter(
        (day) => day < 1 || day > 7,
      );
      if (invalidDays.length > 0) {
        throw new BadRequestException('Lesson days must be between 1 and 7');
      }


      const formattedStartDate = new Date(createGroupDto.start_date);
      if (isNaN(formattedStartDate.getTime())) {
        throw new BadRequestException(
          'Invalid start date format. Use YYYY-MM-DD',
        );
      }

      return await this.prisma.group.create({
        data: {
          ...createGroupDto,
          start_date: formattedStartDate,
        },
        include: {
          course: true,
          branch: true,
        },
      });
    } catch (error) {
      if (
        error instanceof BadRequestException ||
        error instanceof NotFoundException
      ) {
        throw error;
      }
      throw new BadRequestException('Invalid group data provided');
    }
  }

  findAll() {
    return this.prisma.group.findMany({
      include: {
        course: true,
        branch: true,
      },
    });
  }

  async findOne(id: number) {
    const group = await this.prisma.group.findUnique({
      where: { id },
      include: {
        course: true,
        branch: true,
        groupStudents: {
          include: {
            student: true,
          },
        },
        lessons: true,
      },
    });

    if (!group) {
      throw new NotFoundException(`Group with ID ${id} not found`);
    }

    return group;
  }

  async update(id: number, updateGroupDto: UpdateGroupDto) {
    try {
      return await this.prisma.group.update({
        where: { id },
        data: updateGroupDto,
      });
    } catch (error) {
      throw new NotFoundException(`Group with ID ${id} not found`);
    }
  }

  async remove(id: number) {
    try {
      return await this.prisma.group.delete({
        where: { id },
      });
    } catch (error) {
      throw new NotFoundException(`Group with ID ${id} not found`);
    }
  }
}
