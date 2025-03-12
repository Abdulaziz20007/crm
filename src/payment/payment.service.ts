import { Injectable, NotFoundException } from '@nestjs/common';
import { CreatePaymentDto } from './dto/create-payment.dto';
import { UpdatePaymentDto } from './dto/update-payment.dto';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class PaymentService {
  constructor(private readonly prisma: PrismaService) {}

  async calculateLessonQuantity(studentId: number): Promise<number> {
    const student = await this.prisma.user.findUnique({
      where: { id: studentId },
      include: {
        groupStudents: {
          include: {
            group: {
              include: {
                course: true,
              },
            },
          },
        },
      },
    });

    if (!student) {
      throw new NotFoundException('Student not found');
    }

    const totalLessons = student.groupStudents.reduce((acc, groupStudent) => {
      return acc + groupStudent.group.course.lesson_quantity;
    }, 0);

    return totalLessons;
  }

  async create(createPaymentDto: CreatePaymentDto) {
    const student = await this.prisma.user.findUnique({
      where: { id: createPaymentDto.user_id },
    });

    if (!student) {
      throw new NotFoundException('Student not found');
    }

    const lessonQuantity = await this.calculateLessonQuantity(
      createPaymentDto.user_id,
    );

    const payment = await this.prisma.payment.create({
      data: {
        user_id: createPaymentDto.user_id,
        amount: createPaymentDto.amount,
        payment_method_id: createPaymentDto.payment_method_id,
        transaction_id: createPaymentDto.transaction_id,
        lesson_quantity: lessonQuantity,
      },
    });
    await this.prisma.groupStudent.updateMany({
      where: {
        id: createPaymentDto.user_id,
      },
      data: {
        paid_lesson_count: {
          increment: lessonQuantity,
        },
      },
    });

    return payment;
  }

  findAll() {
    return this.prisma.payment.findMany({
      include: {
        user: true,
        paymentMethod: true,
      },
    });
  }

  async findOne(id: number) {
    const payment = await this.prisma.payment.findUnique({
      where: { id },
      include: {
        user: true,
        paymentMethod: true,
      },
    });

    if (!payment) {
      throw new NotFoundException(`Payment with ID ${id} not found`);
    }

    return payment;
  }

  async update(id: number, updatePaymentDto: UpdatePaymentDto) {
    try {
      return await this.prisma.payment.update({
        where: { id },
        data: updatePaymentDto,
      });
    } catch (error) {
      throw new NotFoundException(`Payment with ID ${id} not found`);
    }
  }

  async remove(id: number) {
    try {
      return await this.prisma.payment.delete({
        where: { id },
      });
    } catch (error) {
      throw new NotFoundException(`Payment with ID ${id} not found`);
    }
  }
}
