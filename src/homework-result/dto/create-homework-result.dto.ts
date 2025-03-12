import { ApiProperty } from '@nestjs/swagger';
import { IsInt, IsNotEmpty, IsNumber, IsString, Max, Min } from 'class-validator';

export class CreateHomeworkResultDto {
  @ApiProperty({
    description: 'Student homework ID',
    example: 1,
  })
  @IsInt()
  @IsNotEmpty()
  student_homework_id: number;

  @ApiProperty({
    description: 'Teacher ID', 
    example: 1,
  })
  @IsInt()
  @IsNotEmpty()
  teacher_id: number;

  @ApiProperty({
    description: 'Ball (0-100)',
    example: 85,
  })
  @IsNumber()
  @Min(0)
  @Max(100)
  @IsNotEmpty()
  ball: number;

  @ApiProperty({
    description: 'Comment',
    example: 'Good work, but needs improvement in...',
  })
  @IsString()
  @IsNotEmpty()
  comment: string;
}
