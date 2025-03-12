import {
  IsBoolean,
  IsDate,
  IsInt,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
} from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';

export class CreateLessonDto {
  @ApiProperty({
    description: 'The id of the group',
    example: 1,
  })
  @IsInt()
  @IsNotEmpty()
  group_id: number;

  @ApiProperty({
    description: 'The id of the teacher',
    example: 1,
  })
  @IsNumber()
  @IsNotEmpty()
  teacher_id: number;

  @ApiProperty({
    description: 'The title of the lesson',
    example: 'Lesson 1',
  })
  @IsString()
  @IsNotEmpty()
  title: string;

  @ApiProperty({
    description: 'The homework of the lesson',
    example: 'Homework 1',
  })
  @IsString()
  @IsOptional()
  homework?: string;

  @ApiProperty({
    description: 'The xp of the lesson',
    example: 100,
  })
  @IsNumber()
  xp: number;

  @ApiProperty({
    description: 'The is_exam of the lesson',
    example: true,
  })
  @IsBoolean()
  @IsOptional()
  is_exam?: boolean;

  @ApiProperty({
    description: 'The start_time of the lesson',
    example: '12:00',
  })
  @IsString()
  start_time: string;

  @ApiProperty({
    description: 'The end_time of the lesson',
    example: '13:00',
  })
  @IsString()
  end_time: string;

  @ApiProperty({
    description: 'Lesson date',
    example: '2023-09-01',
    required: false,
  })
  @IsDate()
  @IsOptional()
  @Type(() => Date)
  date?: Date;

  @ApiProperty({ description: 'Lesson description', example: 'First lesson' })
  @IsString()
  description: string;
}
