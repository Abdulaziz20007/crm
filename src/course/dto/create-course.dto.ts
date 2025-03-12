import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsNumber, IsNotEmpty, Min } from 'class-validator';

export class CreateCourseDto {
  @ApiProperty({
    example: 'Nodejs, React, Nextjs, Typescript',
    description: 'Course name',
  })
  @IsNotEmpty()
  @IsString()
  name: string;

  @ApiProperty({
    example: 'Nodejs, React, Nextjs, Typescript',
    description: 'Course description',
  })
  @IsNotEmpty()
  @IsString()
  description: string;

  @ApiProperty({
    example: 20,
    description: 'Maximum number of students',
  })
  @IsNotEmpty()
  @IsNumber()
  @Min(1)
  capacity: number;

  @ApiProperty({
    example: 3,
    description: 'Course duration in months',
  })
  @IsNotEmpty()
  @IsNumber()
  @Min(1)
  duration: number;

  @ApiProperty({
    example: 36,
    description: 'Total number of lessons',
  })
  @IsNotEmpty()
  @IsNumber()
  @Min(1)
  lesson_quantity: number;

  @ApiProperty({
    example: 1000000,
    description: 'Total course price',
  })
  @IsNotEmpty()
  @IsNumber()
  @Min(0)
  price: number;

  @ApiProperty({
    example: 30000,
    description: 'Price per lesson',
  })
  @IsNotEmpty()
  @IsNumber()
  @Min(0)
  price_per_lesson: number;
}
