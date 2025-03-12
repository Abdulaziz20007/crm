import { IsInt } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateGroupStudentDto {
  @ApiProperty({ description: 'Group ID', example: 1 })
  @IsInt()
  group_id: number;

  @ApiProperty({ description: 'Student ID', example: 1 })
  @IsInt()
  student_id: number;
}
