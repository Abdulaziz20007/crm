import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Req,
} from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { Roles } from '../decorators/roles-auth.decorator';
import { Request } from 'express';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post()
  @Roles('ADMIN')
  create(@Body() createUserDto: CreateUserDto, @Req() request: Request) {
    return this.userService.create(createUserDto, request);
  }

  @Get()
  @Roles('ADMIN')
  findAll() {
    return this.userService.findAll();
  }

  @Get(':id')
  @Roles('ADMIN')
  findOne(@Param('id') id: string) {
    return this.userService.findOne(+id);
  }

  @Patch(':id')
  @Roles('ADMIN')
  update(
    @Param('id') id: string,
    @Body() updateUserDto: UpdateUserDto,
    @Req() request: Request,
  ) {
    return this.userService.update(+id, updateUserDto, request);
  }

  @Delete(':id')
  @Roles('ADMIN')
  remove(@Param('id') id: string, @Req() request: Request) {
    return this.userService.remove(+id, request);
  }
}
