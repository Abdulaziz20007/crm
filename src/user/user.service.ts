import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { PrismaService } from '../prisma/prisma.service';
import * as bcrypt from 'bcrypt';
import { Request } from 'express';

@Injectable()
export class UserService {
  constructor(private prisma: PrismaService) {}

  BCRYPT_ROUND = Number(process.env.BCRYPT_ROUND) || 7;

  async create(createUserDto: CreateUserDto, request: Request) {
    const hashedPassword = await bcrypt.hash(
      createUserDto.password,
      this.BCRYPT_ROUND,
    );

    return this.prisma.user.create({
      data: {
        name: createUserDto.name,
        surname: createUserDto.surname,
        email: createUserDto.email,
        phone: createUserDto.phone,
        password: hashedPassword,
        gender: createUserDto.gender,
        xp: createUserDto.xp,
        is_learning: createUserDto.is_learning,
        district: createUserDto.district_id
          ? {
              connect: { id: createUserDto.district_id },
            }
          : undefined,
        job: createUserDto.job,
        hire_date: createUserDto.hire_date,
        salary: createUserDto.salary,
        is_fired: createUserDto.is_fired,
      },
      include: {
        userRoles: {
          include: {
            role: true,
          },
        },
      },
    });
  }

  async findAll() {
    return this.prisma.user.findMany({
      include: {
        userRoles: true,
        // include: {
        //   role: true,
        // },
      },
    });
  }

  async findOne(id: number) {
    const user = await this.prisma.user.findUnique({
      where: { id },
      include: {
        userRoles: {
          include: {
            role: true,
          },
        },
      },
    });

    if (!user) {
      throw new NotFoundException(`User topilmadi`);
    }

    return user;
  }

  async update(id: number, updateUserDto: UpdateUserDto, request: Request) {
    if (updateUserDto.password) {
      updateUserDto.password = await bcrypt.hash(updateUserDto.password, 10);
    }

    try {
      return await this.prisma.user.update({
        where: { id },
        data: updateUserDto,
        include: {
          userRoles: {
            include: {
              role: true,
            },
          },
        },
      });
    } catch (error) {
      throw new NotFoundException(`User topilmadi`);
    }
  }

  async remove(id: number, request: Request) {
    try {
      return await this.prisma.user.delete({
        where: { id },
      });
    } catch (error) {
      throw new NotFoundException(`User topilmadi`);
    }
  }

  async findByEmail(email: string) {
    return this.prisma.user.findUnique({
      where: { email },
      include: {
        userRoles: {
          include: {
            role: true,
          },
        },
      },
    });
  }

  async findByPhone(phone: string) {
    return this.prisma.user.findUnique({
      where: { phone },
      include: {
        userRoles: {
          include: {
            role: true,
          },
        },
      },
    });
  }
}
