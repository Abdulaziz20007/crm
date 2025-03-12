import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { GroupTeacherService } from './group-teacher.service';
import { CreateGroupTeacherDto } from './dto/create-group-teacher.dto';
import { UpdateGroupTeacherDto } from './dto/update-group-teacher.dto';
import { Roles } from '../decorators/roles-auth.decorator';

@Controller('group-teacher')
export class GroupTeacherController {
  constructor(private readonly groupTeacherService: GroupTeacherService) {}

  @Post()
  @Roles('ADMIN')
  create(@Body() createGroupTeacherDto: CreateGroupTeacherDto) {
    return this.groupTeacherService.create(createGroupTeacherDto);
  }

  @Get()
  @Roles('ADMIN', 'TEACHER')
  findAll() {
    return this.groupTeacherService.findAll();
  }

  @Get(':id')
  @Roles('ADMIN', 'TEACHER')
  findOne(@Param('id') id: string) {
    return this.groupTeacherService.findOne(+id);
  }

  @Patch(':id')
  @Roles('ADMIN')
  update(
    @Param('id') id: string,
    @Body() updateGroupTeacherDto: UpdateGroupTeacherDto,
  ) {
    return this.groupTeacherService.update(+id, updateGroupTeacherDto);
  }

  @Delete(':id')
  @Roles('ADMIN')
  remove(@Param('id') id: string) {
    return this.groupTeacherService.remove(+id);
  }
}
