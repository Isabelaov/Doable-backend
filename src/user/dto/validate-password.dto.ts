import { ApiProperty } from '@nestjs/swagger';
import { MinLength, IsString } from 'class-validator';

export class ValidatePasswordDto {
  @ApiProperty({
    description: 'Password of the account to validate',
    example: 'Password12.3!',
  })
  @MinLength(3)
  @IsString()
  password: string;
}
