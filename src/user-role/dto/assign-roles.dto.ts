import { ApiProperty } from '@nestjs/swagger';
import { IsArray, IsInt, IsNotEmpty } from 'class-validator';

export class AssignRolesDto {
  @ApiProperty({
    example: 1,
    description: 'User ID to assign roles to',
    required: true,
  })
  @IsNotEmpty()
  @IsInt()
  userId: number;

  @ApiProperty({
    example: [1, 2],
    description:
      'Array of role IDs to assign (e.g., [1, 2] for both ADMIN and TEACHER roles)',
    type: [Number],
    required: true,
  })
  @IsNotEmpty()
  @IsArray()
  @IsInt({ each: true })
  roleIds: number[];
}
