import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { UserRoleService } from './user-role.service';
import { CreateUserRoleDto } from './dto/create-user-role.dto';
import { UpdateUserRoleDto } from './dto/update-user-role.dto';
import { Roles } from '../decorators/roles-auth.decorator';
import { AssignRolesDto } from './dto/assign-roles.dto';
import { Public } from '../guards/public.decorator';

@Controller('user-role')
export class UserRoleController {
  constructor(private readonly userRoleService: UserRoleService) {}

  @Post()
  @Roles('ADMIN')
  // @Public()
  create(@Body() createUserRoleDto: CreateUserRoleDto) {
    return this.userRoleService.create(createUserRoleDto);
  }

  @Get()
  @Roles('ADMIN')
  findAll() {
    return this.userRoleService.findAll();
  }

  @Get(':id')
  @Roles('ADMIN')
  findOne(@Param('id') id: string) {
    return this.userRoleService.findOne(+id);
  }

  @Get('user/:userId')
  @Roles('ADMIN')
  findByUserId(@Param('userId') userId: string) {
    return this.userRoleService.findByUserId(+userId);
  }

  @Patch(':id')
  @Roles('ADMIN')
  update(
    @Param('id') id: string,
    @Body() updateUserRoleDto: UpdateUserRoleDto,
  ) {
    return this.userRoleService.update(+id, updateUserRoleDto);
  }

  @Delete(':id')
  @Roles('ADMIN')
  remove(@Param('id') id: string) {
    return this.userRoleService.remove(+id);
  }

  @Post('assign')
  @Roles('ADMIN')
  assignRoles(@Body() assignRolesDto: AssignRolesDto) {
    return this.userRoleService.assignRoles(assignRolesDto);
  }
}
