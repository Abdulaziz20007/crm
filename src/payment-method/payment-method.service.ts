import { Injectable } from '@nestjs/common';
import { CreatePaymentMethodDto } from './dto/create-payment-method.dto';
import { UpdatePaymentMethodDto } from './dto/update-payment-method.dto';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class PaymentMethodService {
  constructor(private readonly prisma: PrismaService) {}

  create(createPaymentMethodDto: CreatePaymentMethodDto) {
    return this.prisma.paymentMethod.create({
      data: createPaymentMethodDto,
    });
  }

  findAll() {
    return this.prisma.paymentMethod.findMany();
  }

  findOne(id: number) {
    return this.prisma.paymentMethod.findUnique({
      where: { id },
    });
  }

  update(id: number, updatePaymentMethodDto: UpdatePaymentMethodDto) {
    return this.prisma.paymentMethod.update({
      where: { id },
      data: updatePaymentMethodDto,
    });
  }

  remove(id: number) {
    return this.prisma.paymentMethod.delete({
      where: { id },
    });
  }
}
