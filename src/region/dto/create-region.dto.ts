import { IsNotEmpty, IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateRegionDto {
  @ApiProperty({
    description: 'Name of the region',
    example: 'Toshkent',
  })
  @IsString()
  @IsNotEmpty()
  name: string;
}
