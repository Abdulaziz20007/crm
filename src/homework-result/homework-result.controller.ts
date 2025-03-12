import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { HomeworkResultService } from './homework-result.service';
import { CreateHomeworkResultDto } from './dto/create-homework-result.dto';
import { UpdateHomeworkResultDto } from './dto/update-homework-result.dto';
import { Roles } from '../decorators/roles-auth.decorator';

@Controller('homework-result')
export class HomeworkResultController {
  constructor(private readonly homeworkResultService: HomeworkResultService) {}

  @Post()
  @Roles('TEACHER')
  create(@Body() createHomeworkResultDto: CreateHomeworkResultDto) {
    return this.homeworkResultService.create(createHomeworkResultDto);
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
  @Roles('TEACHER')
  update(
    @Param('id') id: string,
    @Body() updateHomeworkResultDto: UpdateHomeworkResultDto,
  ) {
    return this.homeworkResultService.update(+id, updateHomeworkResultDto);
  }

  @Delete(':id')
  @Roles('ADMIN', 'TEACHER')
  remove(@Param('id') id: string) {
    return this.homeworkResultService.remove(+id);
  }
}
