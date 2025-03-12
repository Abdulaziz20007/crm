import { PartialType } from '@nestjs/swagger';
import { CreateAttendanceDto } from './create-attendance.dto';
import { IsBoolean } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class UpdateAttendanceDto extends PartialType(CreateAttendanceDto) {
  @ApiProperty({ description: 'Is present', example: true })
  @IsBoolean()
  is_present: boolean;
}
