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
import { StudentHomeworkService } from './student-homework.service';
import { CreateStudentHomeworkDto } from './dto/create-student-homework.dto';
import { UpdateStudentHomeworkDto } from './dto/update-student-homework.dto';
import { Request } from 'express';

@Controller('student-homework')
export class StudentHomeworkController {
  constructor(
    private readonly studentHomeworkService: StudentHomeworkService,
  ) {}

  @Post()
  create(
    @Body() createStudentHomeworkDto: CreateStudentHomeworkDto,
    @Req() request: Request,
  ) {
    return this.studentHomeworkService.create(
      createStudentHomeworkDto,
      request,
    );
  }

  @Get()
  findAll() {
    return this.studentHomeworkService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.studentHomeworkService.findOne(+id);
  }

  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updateStudentHomeworkDto: UpdateStudentHomeworkDto,
    @Req() request: Request,
  ) {
    return this.studentHomeworkService.update(
      +id,
      updateStudentHomeworkDto,
      request,
    );
  }

  @Delete(':id')
  remove(@Param('id') id: string, @Req() request: Request) {
    return this.studentHomeworkService.remove(+id, request);
  }
}
