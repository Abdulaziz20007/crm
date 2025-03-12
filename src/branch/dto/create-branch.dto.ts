import { IsInt, IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateBranchDto {
  @ApiProperty({ description: 'Branch name', example: 'Branch A' })
  @IsString()
  name: string;

  @ApiProperty({ description: 'Region ID', example: 1 })
  @IsInt()
  region_id: number;

  @ApiProperty({ description: 'District ID', example: 1 })
  @IsInt()
  district_id: number;

  @ApiProperty({ description: 'Location', example: '40.123456, 71.123456' })
  @IsString()
  location: string;
}
