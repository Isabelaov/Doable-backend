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
import { ApiBearerAuth, ApiOperation, ApiTags } from '@nestjs/swagger';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';

@Controller('user')
@ApiBearerAuth()
@ApiTags('User')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @ApiOperation({ summary: 'Register user' })
  @Post()
  register(@Body() createUserDto: CreateUserDto) {
    return this.userService.create(createUserDto);
  }

  @ApiOperation({ summary: 'Update user' })
  @Patch(':id')
  update(@Body() updateUserDto: UpdateUserDto, @Param('id') id: number) {
    return this.userService.update(updateUserDto, id);
  }

  @ApiOperation({ summary: 'Get user with token' })
  @Get()
  getByToken(@Headers('authorization') authHeader: string) {
    const token = authHeader?.split(' ')[1];
    return this.userService.findByToken(token);
  }

  @ApiOperation({ summary: 'Get user with ID' })
  @Get(':id')
  get(@Param('id') id: number) {
    return this.userService.findById(id);
  }
}
