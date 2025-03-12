import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateUserRoleDto } from './dto/create-user-role.dto';
import { UpdateUserRoleDto } from './dto/update-user-role.dto';
import { PrismaService } from '../prisma/prisma.service';
import { AssignRolesDto } from './dto/assign-roles.dto';

@Injectable()
export class UserRoleService {
  constructor(private prisma: PrismaService) {}

  async create(createUserRoleDto: CreateUserRoleDto) {
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
      throw new NotFoundException(`UserRole with ID ${id} not found`);
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
      throw new NotFoundException(`UserRole with ID ${id} not found`);
    }
  }

  async remove(id: number) {
    try {
      return await this.prisma.userRole.delete({
        where: { id },
      });
    } catch (error) {
      throw new NotFoundException(`UserRole with ID ${id} not found`);
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

  async assignRoles(assignRolesDto: AssignRolesDto) {
    const { userId, roleIds } = assignRolesDto;

    const user = await this.prisma.user.findUnique({
      where: { id: userId },
    });

    if (!user) {
      throw new NotFoundException(`User with ID ${userId} not found`);
    }

    return this.prisma.$transaction(async (prisma) => {
      await prisma.userRole.deleteMany({
        where: { user_id: userId },
      });

      const roleAssignments = await Promise.all(
        roleIds.map((roleId) =>
          prisma.userRole.create({
            data: {
              user_id: userId,
              role_id: roleId,
            },
            include: {
              role: true,
            },
          }),
        ),
      );

      return roleAssignments;
    });
  }
}
