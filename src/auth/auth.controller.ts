import { Body, Controller, Post } from '@nestjs/common';
import { AuthService } from './auth.service';
import { ApiBody, ApiOperation, ApiResponse } from '@nestjs/swagger';
import { LoginUserDto } from './dto/login.dto';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('login')
  @ApiOperation({ summary: 'Login a user' })
  @ApiResponse({
    status: 201,
    description: 'Successful login.',
    example: {
      token: 'token123',
      user: {
        id: 1,
        name: 'uwuwuwuwuwuwuwuwu',
        email: 'jane.doe@email.com',
      },
    },
  })
  @ApiResponse({
    status: 401,
    description: 'Unauthorized.',
    example: {
      message: 'Invalid credentials',
      error: 'Bad Request',
      statusCode: 400,
    },
  })
  async login(@Body() loginUserDto: LoginUserDto) {
    return await this.authService.login(loginUserDto);
  }

  @Post('decode')
  @ApiOperation({ summary: 'Verify user token' })
  @ApiResponse({ status: 201, description: 'Token decoded.' })
  @ApiResponse({ status: 401, description: 'Unauthorized, token invalid.' })
  @ApiBody({
    schema: {
      type: 'object',
      properties: {
        token: {
          type: 'string',
          example: 'token123',
        },
      },
      required: ['token'],
    },
  })
  async decode(@Body('token') token: string) {
    return await this.authService.decodeToken(token);
  }
}
