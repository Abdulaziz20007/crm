import { IsNotEmpty, IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreatePaymentMethodDto {
  
  @ApiProperty({
    description: 'Name of the payment method',
    example: 'Uzum',
  })
  @IsString()
  @IsNotEmpty()
  name: string;

  @ApiProperty({
    description: 'URL for the payment method',
    example: 'https://example.uz/service-id',
  })
  @IsString()
  @IsNotEmpty()
  url: string;
}
