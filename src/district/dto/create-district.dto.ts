import { ApiProperty } from '@nestjs/swagger';
import { IsInt, IsString } from 'class-validator';

export class CreateDistrictDto {
  @ApiProperty({ description: 'District name', example: 'Toshkent' })
  @IsString()
  name: string;

  @ApiProperty({ description: 'Region ID', example: 1 })
  @IsInt()
  region_id: number;
}
