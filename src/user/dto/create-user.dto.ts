import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsNotEmpty, MinLength, IsEmail } from 'class-validator';

export class CreateUserDto {
  @ApiProperty({ description: 'Name of the user', example: 'Jane Doe' })
  @IsString()
  @IsNotEmpty()
  @MinLength(5)
  name: string;

  @ApiProperty({
    description: 'Email of the user',
    example: 'jane.doe@email.com',
  })
  @IsString()
  @IsNotEmpty()
  @IsEmail()
  email: string;

  @ApiProperty({
    description: 'Password of the account',
    example: 'Password12.3!',
  })
  @MinLength(3)
  @IsString()
  password: string;
}
