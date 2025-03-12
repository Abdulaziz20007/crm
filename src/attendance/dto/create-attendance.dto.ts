import { IsInt, IsNotEmpty, IsOptional, IsDateString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';

export class CreateAttendanceDto {
  @ApiProperty({ description: 'Student ID', example: 1 })
  @IsInt()
  @IsNotEmpty()
  @Type(() => Number)
  student_id: number;

  @ApiProperty({ description: 'Lesson ID', example: 1 })
  @IsInt()
  @IsNotEmpty()
  @Type(() => Number)
  lesson_id: number;

  @ApiProperty({
    description: 'Attendance date',
    example: '2025-11-11',
    required: false,
  })
  @IsDateString()
  @IsOptional()
  date?: string;
}
