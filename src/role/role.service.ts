import {
  Injectable,
  NotFoundException,
  ConflictException,
} from '@nestjs/common';
import { CreateRoleDto } from './dto/create-role.dto';
import { UpdateRoleDto } from './dto/update-role.dto';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class RoleService {
  constructor(private prisma: PrismaService) {}

  async create(createRoleDto: CreateRoleDto) {
    const existingRole = await this.prisma.role.findUnique({
      where: { name: createRoleDto.name.toUpperCase() },
    });

    if (existingRole) {
      throw new ConflictException(
        `Role with name ${createRoleDto.name} already exists`,
      );
    }

    // Create new role if it doesn't exist
    return this.prisma.role.create({
      data: {
        name: createRoleDto.name.toUpperCase(),
      },
    });
  }

  async findAll() {
    return this.prisma.role.findMany();
  }

  async findOne(id: number) {
    const role = await this.prisma.role.findUnique({
      where: { id },
      include: {
        userRoles: {
          include: {
            user: true,
          },
        },
      },
    });

    if (!role) {
      throw new NotFoundException(`Role with ID ${id} not found`);
    }

    return role;
  }

  async findRoleByValue(value: string) {
    return this.prisma.role.findFirst({
      where: {
        name: value.toUpperCase(),
      },
      include: {
        userRoles: {
          include: {
            user: true,
          },
        },
      },
    });
  }

  async update(id: number, updateRoleDto: UpdateRoleDto) {
    try {
      return await this.prisma.role.update({
        where: { id },
        data: updateRoleDto,
        include: {
          userRoles: {
            include: {
              user: true,
            },
          },
        },
      });
    } catch (error) {
      throw new NotFoundException(`Role with ID ${id} not found`);
    }
  }

  async remove(id: number) {
    try {
      return await this.prisma.role.delete({
        where: { id },
      });
    } catch (error) {
      throw new NotFoundException(`Role with ID ${id} not found`);
    }
  }
}
