import { ApiProperty } from '@nestjs/swagger';
import { Transform } from 'class-transformer';
import { IsEmail, IsString, MinLength } from 'class-validator';

export class LoginUserDto {
  @ApiProperty({
    description: 'The email of the user',
    example: 'jane.doe@email.com',
  })
  @IsEmail()
  @Transform(({ value }) => value.toLocaleLowerCase())
  email: string;

  @ApiProperty({
    description: 'The password for the user',
    example: 'Password12.3!',
  })
  @IsString()
  @MinLength(3)
  password: string;
}
