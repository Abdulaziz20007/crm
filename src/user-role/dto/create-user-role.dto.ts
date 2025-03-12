import { ApiProperty } from '@nestjs/swagger';
import { IsInt, IsNotEmpty } from 'class-validator';

export class CreateUserRoleDto {
  @ApiProperty({ 
    example: 1, 
    description: 'User ID to assign role to',
    required: true
  })
  @IsNotEmpty()
  @IsInt()
  user_id: number;

  @ApiProperty({ 
    example: 1, 
    description: 'Role ID to assign (e.g., 1 for ADMIN, 2 for TEACHER)',
    required: true
  })
  @IsNotEmpty()
  @IsInt()
  role_id: number;
}
