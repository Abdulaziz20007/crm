import { Injectable } from '@nestjs/common';
import { CreateDistrictDto } from './dto/create-district.dto';
import { UpdateDistrictDto } from './dto/update-district.dto';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class DistrictService {
  constructor(private readonly prisma: PrismaService) {}

  create(createDistrictDto: CreateDistrictDto) {
    return this.prisma.district.create({
      data: createDistrictDto,
    });
  }

  findAll() {
    return this.prisma.district.findMany();
  }

  findOne(id: number) {
    return this.prisma.district.findUnique({ where: { id } });
  }

  update(id: number, updateDistrictDto: UpdateDistrictDto) {
    return this.prisma.district.update({
      where: { id },
      data: updateDistrictDto,
    });
  }

  remove(id: number) {
    return this.prisma.district.delete({ where: { id } });
  }
}
