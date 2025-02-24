import {
  Body,
  Controller,
  Post,
  Get,
  Patch,
  Param,
  Headers,
} from '@nestjs/common';
import { UserService } from './user.service';
import {
  ApiBearerAuth,
  ApiOperation,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';

@Controller('user')
@ApiBearerAuth()
@ApiTags('User')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @ApiOperation({ summary: 'Register user' })
  @ApiResponse({
    status: 201,
    description: 'User registered.',
    example: { name: 'isa uwu', email: 'isa.uwuuwu@email.com', id: 4 },
  })
  @ApiResponse({
    status: 400,
    description: 'Bad request',
    example: {
      message: ['email must be an email'],
      error: 'Bad Request',
      statusCode: 400,
    },
  })
  @Post()
  register(@Body() createUserDto: CreateUserDto) {
    return this.userService.create(createUserDto);
  }

  @ApiOperation({ summary: 'Update user' })
  @ApiResponse({
    status: 200,
    description: 'User updated',
    example: { id: 4, name: 'isa awaeweuwu', email: 'isaaaaaaaa@gmail.com' },
  })
  @ApiResponse({
    status: 400,
    description: 'Bad request',
    example: {
      message: 'User with ID 100 not found',
      error: 'Bad Request',
      statusCode: 400,
    },
  })
  @Patch(':id')
  update(@Body() updateUserDto: UpdateUserDto, @Param('id') id: number) {
    return this.userService.update(updateUserDto, id);
  }

  @ApiOperation({ summary: 'Get user with token' })
  @ApiResponse({
    status: 200,
    description: 'User returned',
    example: {
      id: 1,
      name: 'uwuwuwuwuwuwuwuwu',
      email: 'jane.doe@email.com',
    },
  })
  @ApiResponse({
    status: 400,
    description: 'Bad request',
    example: {
      message: 'jwt must be provided',
      error: 'Bad Request',
      statusCode: 400,
    },
  })
  @Get()
  getByToken(@Headers('authorization') authHeader: string) {
    const token = authHeader?.split(' ')[1];
    return this.userService.findByToken(token);
  }

  @ApiOperation({ summary: 'Get user with ID' })
  @ApiResponse({
    status: 200,
    description: 'User retrieved',
    example: {
      id: 1,
      name: 'uwuwuwuwuwuwuwuwu',
      email: 'jane.doe@email.com',
    },
  })
  @Get(':id')
  get(@Param('id') id: number) {
    return this.userService.findById(id);
  }
}
