import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsNumber, IsString } from 'class-validator';
export class CreateStudentHomeworkDto {
  @ApiProperty({
    description: 'Description of the student homework',
    example: 'Homework description',
  })
  @IsString()
  @IsNotEmpty()
  description: string;

  @ApiProperty({
    description: 'Student ID of the student homework',
    example: 1,
  })
  @IsNumber()
  @IsNotEmpty()
  student_id: number;

  @ApiProperty({
    description: 'Lesson ID of the student homework',
    example: 1,
  })
  @IsNumber()
  @IsNotEmpty()
  lesson_id: number;
}
