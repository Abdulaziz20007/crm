import {
  Injectable,
  UnauthorizedException,
  ConflictException,
  BadRequestException,
  ForbiddenException,
  InternalServerErrorException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { PrismaService } from '../prisma/prisma.service';
import * as bcrypt from 'bcrypt';
import { SigninDto } from './dto/signin.dto';
import { Response } from 'express';
import { CreateUserDto } from '../user/dto/create-user.dto';

@Injectable()
export class AuthService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly jwtService: JwtService,
  ) {}

  COOKIE_OPTIONS = {
    httpOnly: true,
    maxAge: Number(process.env.COOKIE_TIME) || 15 * 24 * 60 * 60 * 1000,
  };

  BCRYPT_ROUND = Number(process.env.BCRYPT_ROUND) || 7;

  async getTokens(user: any) {
    const userRoles = await this.prisma.userRole.findMany({
      where: { user_id: user.id },
      include: { role: true },
    });

    const roleNames = userRoles.map((ur) => ur.role.name);

    const payload = {
      id: user.id,
      name: user.name,
      surname: user.surname,
      phone: user.phone ? user.phone.toString() : null,
      roles: roleNames,
    };

    const accessToken = await this.jwtService.signAsync(payload, {
      secret: process.env.ACCESS_TOKEN_KEY,
      expiresIn: process.env.ACCESS_TIME || '15m',
    });

    const refreshToken = await this.jwtService.signAsync(payload, {
      secret: process.env.REFRESH_TOKEN_KEY,
      expiresIn: process.env.REFRESH_TIME || '7d',
    });

    return { accessToken, refreshToken };
  }

  async signup(createUserDto: CreateUserDto, res: Response) {
    const userByPhone = await this.prisma.user.findFirst({
      where: { phone: createUserDto.phone },
    });

    if (userByPhone) {
      throw new ConflictException(`Bu telefon raqam avval ro'yxatdan otgan`);
    }
    if (createUserDto.email) {
      const userByEmail = await this.prisma.user.findUnique({
        where: { email: createUserDto.email },
      });

      if (userByEmail) {
        throw new ConflictException(`Bu email avval ro'yxatdan o'tgan`);
      }
    }

    if (createUserDto.district_id) {
      const district = await this.prisma.district.findUnique({
        where: { id: createUserDto.district_id },
      });

      if (!district) {
        throw new BadRequestException(
          `District with ID ${createUserDto.district_id} not found`,
        );
      }
    }

    const hashedPassword = await bcrypt.hash(
      createUserDto.password,
      this.BCRYPT_ROUND,
    );

    const newUser = await this.prisma.user.create({
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
    });

    const tokens = await this.getTokens(newUser);

    await this.prisma.user.update({
      where: { id: newUser.id },
      data: { refreshToken: tokens.refreshToken },
    });

    res.cookie('refreshToken', tokens.refreshToken, this.COOKIE_OPTIONS);

    return {
      message: 'User muvaffaqiyatli yaratildi',
      userId: newUser.id,
      accessToken: tokens.accessToken,
    };
  }

  async signin(signinDto: SigninDto, res: Response) {
    const user = await this.prisma.user.findUnique({
      where: { id: signinDto.id },
      include: {
        userRoles: {
          include: {
            role: true,
          },
        },
      },
    });

    if (!user) {
      throw new UnauthorizedException(`User topilmadi`);
    }

    const passwordMatches = await bcrypt.compare(
      signinDto.password,
      user.password,
    );

    if (!passwordMatches) {
      throw new UnauthorizedException(`Parol noto'g'ri`);
    }

    const tokens = await this.getTokens(user);

    await this.prisma.user.update({
      where: { id: user.id },
      data: { refreshToken: tokens.refreshToken },
    });

    res.cookie('refreshToken', tokens.refreshToken, this.COOKIE_OPTIONS);

    return {
      accessToken: tokens.accessToken,
      user: {
        id: user.id,
        name: user.name,
        surname: user.surname,
        email: user.email,
        phone: user.phone ? user.phone.toString() : null,
        roles: user.userRoles.map((ur) => ur.role.name),
      },
    };
  }

  async refreshToken(refreshToken: string, res: Response) {
    if (!refreshToken) {
      throw new UnauthorizedException('Refresh token topilmadi');
    }

    try {
      const decodedToken = await this.jwtService.verifyAsync(refreshToken, {
        secret: process.env.REFRESH_TOKEN_KEY,
      });

      const user = await this.prisma.user.findUnique({
        where: { id: decodedToken.id },
        include: {
          userRoles: {
            include: {
              role: true,
            },
          },
        },
      });

      if (!user || user.refreshToken !== refreshToken) {
        throw new UnauthorizedException('Refresh token topilmadi');
      }

      const tokens = await this.getTokens(user);

      const updatedUser = await this.prisma.user.update({
        where: { id: user.id },
        data: { refreshToken: tokens.refreshToken },
      });

      if (!updatedUser) {
        throw new InternalServerErrorException(
          'Failed to update refresh token',
        );
      }

      res.cookie('refreshToken', tokens.refreshToken, this.COOKIE_OPTIONS);

      return {
        message: 'Tokenlar yangilandi',
        userId: user.id,
        accessToken: tokens.accessToken,
      };
    } catch (error) {
      throw new UnauthorizedException('Refresh token topilmadi');
    }
  }

  async signout(refreshToken: string, res: Response) {
    if (!refreshToken) {
      throw new UnauthorizedException('Refresh token topilmadi');
    }

    try {
      const userData = await this.jwtService.verifyAsync(refreshToken, {
        secret: process.env.REFRESH_TOKEN_KEY,
      });

      await this.prisma.user.update({
        where: { id: userData.id },
        data: { refreshToken: null },
      });

      res.clearCookie('refreshToken');

      return {
        message: 'User muvaffaqiyatli chiqdi',
      };
    } catch (error) {
      throw new UnauthorizedException('Refresh token topilmadi');
    }
  }
}
