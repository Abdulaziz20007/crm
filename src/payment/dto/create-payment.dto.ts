import { ApiProperty } from '@nestjs/swagger';

export class CreatePaymentDto {
  @ApiProperty({
    description: 'The id of the student',
    example: 1,
  })
  user_id: number;

  @ApiProperty({
    description: 'The price of the payment',
    example: 100000,
  })
  amount: number;

  @ApiProperty({
    description: 'The payment method id',
    example: 1,
  })
  payment_method_id: number;

  @ApiProperty({
    description: 'The transaction id',
    example: '1234567890',
  })
  transaction_id: string;
}
