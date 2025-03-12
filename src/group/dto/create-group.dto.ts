import { ApiProperty } from '@nestjs/swagger';
import {
  IsString,
  IsNumber,
  IsArray,
  IsBoolean,
  IsDateString,
  IsNotEmpty,
} from 'class-validator';
import { Type } from 'class-transformer';

export class CreateGroupDto {
  @ApiProperty({
    example: 'N15',
    description: 'Group name',
  })
  @IsNotEmpty()
  @IsString()
  name: string;

  @ApiProperty({
    example: 1,
    description: 'Course ID',
  })
  @IsNotEmpty()
  @IsNumber()
  @Type(() => Number)
  course_id: number;

  @ApiProperty({
    example: [1, 2, 3],
    description: 'Lesson days (1-7)',
  })
  @IsArray()
  @IsNumber({}, { each: true })
  @Type(() => Number)
  lesson_days: number[];

  @ApiProperty({
    example: '12:00',
    description: 'Lesson start time',
  })
  @IsNotEmpty()
  @IsString()
  lesson_start_time: string;

  @ApiProperty({
    example: '13:00',
    description: 'Lesson end time',
  })
  @IsNotEmpty()
  @IsString()
  lesson_end_time: string;

  @ApiProperty({
    example: '2025-11-11',
    description: 'Start date (YYYY-MM-DD)',
  })
  @IsNotEmpty()
  @IsDateString()
  start_date: string;

  @ApiProperty({
    example: 'Room name',
    description: 'Room name or number',
  })
  @IsNotEmpty()
  @IsString()
  room: string;

  @ApiProperty({
    example: 2,
    description: 'Floor number',
  })
  @IsNotEmpty()
  @IsNumber()
  @Type(() => Number)
  floor: number;

  @ApiProperty({
    example: 1,
    description: 'Branch ID',
  })
  @IsNotEmpty()
  @IsNumber()
  @Type(() => Number)
  branch_id: number;

  @ApiProperty({
    example: true,
    description: 'Is group active',
  })
  @IsBoolean()
  @Type(() => Boolean)
  is_active: boolean;
}
