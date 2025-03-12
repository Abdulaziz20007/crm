import {
  Injectable,
  NotFoundException,
  UnauthorizedException,
  ConflictException,
} from '@nestjs/common';
import { CreateUserRoleDto } from './dto/create-user-role.dto';
import { UpdateUserRoleDto } from './dto/update-user-role.dto';
import { PrismaService } from '../prisma/prisma.service';
import { AssignRolesDto } from './dto/assign-roles.dto';
import { Request } from 'express';
import { User } from '@prisma/client';

@Injectable()
export class UserRoleService {
  constructor(private prisma: PrismaService) {}

  async create(createUserRoleDto: CreateUserRoleDto, request: Request) {
    if ('user' in request) {
      const user = request.user as User;
      const role = await this.prisma.role.findUnique({
        where: { id: createUserRoleDto.role_id },
      });

      if (role?.name === 'ADMIN') {
        const adminUser = await this.prisma.user.findUnique({
          where: { id: user.id },
          include: { userRoles: { include: { role: true } } },
        });

        const isCreator = adminUser?.is_creator;
        if (!isCreator) {
          throw new UnauthorizedException(
            'Faqat Creator adminlar admin rolini yaratishi mumkin',
          );
        }
      }
    }

    const existingUserRole = await this.prisma.userRole.findFirst({
      where: {
        user_id: createUserRoleDto.user_id,
        role_id: createUserRoleDto.role_id,
      },
    });

    if (existingUserRole) {
      throw new ConflictException('Userda bu role mavjud');
    }

    return this.prisma.userRole.create({
      data: createUserRoleDto,
    });
  }

  async findAll() {
    return this.prisma.userRole.findMany({
      include: {
        user: true,
        role: true,
      },
    });
  }

  async findOne(id: number) {
    const userRole = await this.prisma.userRole.findUnique({
      where: { id },
      include: {
        user: true,
        role: true,
      },
    });

    if (!userRole) {
      throw new NotFoundException(`UserRole ID ${id} topilmadi`);
    }

    return userRole;
  }

  async update(id: number, updateUserRoleDto: UpdateUserRoleDto) {
    try {
      return await this.prisma.userRole.update({
        where: { id },
        data: updateUserRoleDto,
      });
    } catch (error) {
      throw new NotFoundException(`UserRole ID ${id} topilmadi`);
    }
  }

  async remove(id: number) {
    try {
      return await this.prisma.userRole.delete({
        where: { id },
      });
    } catch (error) {
      throw new NotFoundException(`UserRole ID ${id} topilmadi`);
    }
  }

  async findByUserId(userId: number) {
    return this.prisma.userRole.findMany({
      where: { user_id: userId },
      include: {
        role: true,
      },
    });
  }
}
