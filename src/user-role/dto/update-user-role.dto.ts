import { PartialType } from '@nestjs/swagger';
import { CreateUserRoleDto } from './create-user-role.dto';
import { ApiProperty } from '@nestjs/swagger';

export class UpdateUserRoleDto extends PartialType(CreateUserRoleDto) {
  @ApiProperty({ 
    example: 1, 
    description: 'User ID',
    required: false
  })
  user_id?: number;

  @ApiProperty({ 
    example: 1, 
    description: 'Role ID',
    required: false
  })
  role_id?: number;
}
