import { ApiProperty } from '@nestjs/swagger';
import {
  IsEmail,
  IsInt,
  IsNotEmpty,
  IsOptional,
  IsString,
  IsBoolean,
  IsNumber,
} from 'class-validator';

export class CreateUserDto {
  @ApiProperty({ example: 'John', description: 'User first name' })
  @IsNotEmpty()
  @IsString()
  name: string;

  @ApiProperty({ example: 'Doe', description: 'User last name' })
  @IsNotEmpty()
  @IsString()
  surname: string;

  @ApiProperty({
    example: 'john.doe@example.com',
    description: 'User email',
    required: false,
  })
  @IsOptional()
  @IsEmail()
  email?: string;

  @ApiProperty({ example: 998901234567, description: 'User phone number' })
  @IsNotEmpty()
  @IsNumber()
  phone: number;

  @ApiProperty({ example: 'password123', description: 'User password' })
  @IsNotEmpty()
  @IsString()
  password: string;

  @ApiProperty({ example: 'Male', description: 'User gender', required: false })
  @IsOptional()
  @IsString()
  gender?: string;

  @ApiProperty({
    example: 100,
    description: 'Experience points',
    required: false,
  })
  @IsOptional()
  @IsNumber()
  xp?: number;

  @ApiProperty({ example: true, description: 'Is learning', required: false })
  @IsOptional()
  @IsBoolean()
  is_learning?: boolean;

  @ApiProperty({ example: 1, description: 'District ID', required: false })
  @IsOptional()
  @IsInt()
  district_id?: number;

  @ApiProperty({
    example: 'Teacher',
    description: 'Job title',
    required: false,
  })
  @IsOptional()
  @IsString()
  job?: string;

  @ApiProperty({
    example: '2024-01-01',
    description: 'Hire date',
    required: false,
  })
  @IsOptional()
  @IsString()
  hire_date?: string;

  @ApiProperty({ example: 1000.0, description: 'Salary', required: false })
  @IsOptional()
  @IsNumber()
  salary?: number;

  @ApiProperty({ example: false, description: 'Is fired', required: false })
  @IsOptional()
  @IsBoolean()
  is_fired?: boolean;
}
