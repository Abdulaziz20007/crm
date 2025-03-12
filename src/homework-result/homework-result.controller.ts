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
import { HomeworkResultService } from './homework-result.service';
import { CreateHomeworkResultDto } from './dto/create-homework-result.dto';
import { UpdateHomeworkResultDto } from './dto/update-homework-result.dto';
import { Roles } from '../decorators/roles-auth.decorator';
import { Request } from 'express';

@Controller('homework-result')
export class HomeworkResultController {
  constructor(private readonly homeworkResultService: HomeworkResultService) {}

  @Post()
  @Roles('TEACHER', 'ADMIN')
  create(
    @Body() createHomeworkResultDto: CreateHomeworkResultDto,
    @Req() request: Request,
  ) {
    return this.homeworkResultService.create(createHomeworkResultDto, request);
  }

  @Get()
  @Roles('ADMIN', 'TEACHER', 'STUDENT')
  findAll() {
    return this.homeworkResultService.findAll();
  }

  @Get(':id')
  @Roles('ADMIN', 'TEACHER', 'STUDENT')
  findOne(@Param('id') id: string) {
    return this.homeworkResultService.findOne(+id);
  }

  @Patch(':id')
  @Roles('TEACHER', 'ADMIN')
  update(
    @Param('id') id: string,
    @Body() updateHomeworkResultDto: UpdateHomeworkResultDto,
    @Req() request: Request,
  ) {
    return this.homeworkResultService.update(
      +id,
      updateHomeworkResultDto,
      request,
    );
  }

  @Delete(':id')
  @Roles('ADMIN', 'TEACHER')
  remove(@Param('id') id: string, @Req() request: Request) {
    return this.homeworkResultService.remove(+id, request);
  }
}
