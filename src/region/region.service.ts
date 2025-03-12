import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateRegionDto } from './dto/create-region.dto';
import { UpdateRegionDto } from './dto/update-region.dto';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class RegionService {
  constructor(private readonly prisma: PrismaService) {}

  create(createRegionDto: CreateRegionDto) {
    return this.prisma.region.create({
      data: createRegionDto,
    });
  }

  findAll() {
    return this.prisma.region.findMany();
  }

  findOne(id: number) {
    return this.prisma.region.findUnique({
      where: { id },
    });
  }

  async update(id: number, updateRegionDto: UpdateRegionDto) {
    try {
      return await this.prisma.region.update({
        where: { id },
        data: updateRegionDto,
      });
    } catch (error) {
      throw new NotFoundException(`Region with ID ${id} not found`);
    }
  }

  async remove(id: number) {
    try {
      return await this.prisma.region.delete({
        where: { id },
      });
    } catch (error) {
      throw new NotFoundException(`Region with ID ${id} not found`);
    }
  }
}
