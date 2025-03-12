import { IsInt, IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class SigninDto {
  @ApiProperty({
    description: 'User ID',
    example: 1,
    required: true,
  })
  @IsInt()
  id: number;

  @ApiProperty({
    description: 'User password',
    example: 'password123',
    required: true,
  })
  @IsString()
  password: string;
}
