import { ApiProperty } from '@nestjs/swagger';
import { IsNumber, IsBoolean, IsString } from 'class-validator';

export class CreateGroupTeacherDto {
  @ApiProperty({ example: 1, description: 'Teacher ID' })
  @IsNumber()
  teacher_id: number;

  @ApiProperty({ example: 1, description: 'Group ID' })
  @IsNumber()
  group_id: number;

  @ApiProperty({ example: true, description: 'Is main teacher' })
  @IsBoolean()
  is_main: boolean;

  @ApiProperty({ example: 10, description: 'Duration in weeks/months' })
  @IsNumber()
  duration: number;

  @ApiProperty({ example: 1, description: 'Start month (1-12)' })
  @IsNumber()
  start_month: number;

  @ApiProperty({ example: '12:00', description: 'Start time' })
  @IsString()
  start_time: string;

  @ApiProperty({ example: '13:00', description: 'End time' })
  @IsString()
  end_time: string;
}
