import { Controller, Post, Body, Res, UseGuards } from '@nestjs/common';
import { Response } from 'express';
import { AuthService } from './auth.service';
import { CreateUserDto } from '../user/dto/create-user.dto';
import { SigninDto } from './dto/signin.dto';
import { CookieGetter } from '../decorators/cookie-getter.decorator';
import { JwtAuthGuard } from '../guards/jwt.guard';
import { Public } from '../guards/public.decorator';
import { Roles } from '../decorators/roles-auth.decorator';

@Controller('auth')
@UseGuards(JwtAuthGuard)
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('signup')
  @Public()
  async signup(
    @Body() createUserDto: CreateUserDto,
    @Res({ passthrough: true }) res: Response,
  ) {
    return this.authService.signup(createUserDto, res);
  }

  @Post('signin')
  @Public()
  async signin(
    @Body() signinDto: SigninDto,
    @Res({ passthrough: true }) res: Response,
  ) {
    return this.authService.signin(signinDto, res);
  }

  @Post('signout')
  @Roles('ADMIN', 'STUDENT', 'TEACHER')
  async signout(
    @CookieGetter('refresh_token') refreshToken: string,
    @Res({ passthrough: true }) res: Response,
  ) {
    return this.authService.signout(refreshToken, res);
  }

  @Post('refresh')
  @Public()
  async refresh(
    @CookieGetter('refresh_token') refreshToken: string,
    @Res({ passthrough: true }) res: Response,
  ) {
    return this.authService.refreshToken(refreshToken, res);
  }
}
