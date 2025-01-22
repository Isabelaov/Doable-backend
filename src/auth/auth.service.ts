import {
  BadRequestException,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';
import { LoginUserDto } from './dto/login.dto';
import { UserService } from 'src/user/user.service';

@Injectable()
export class AuthService {
  constructor(
    private readonly jwtService: JwtService,
    private readonly userService: UserService,
  ) {}

  async login(dto: LoginUserDto) {
    try {
      const { email, password } = dto;
      const user = await this.userService.findByEmail(email);

      if (!(await bcrypt.compare(password, user.password))) {
        throw new UnauthorizedException('Invalid credentials');
      }

      const payload = { id: user.id };
      return { token: this.jwtService.sign(payload) };
    } catch (error) {
      console.log(error);

      throw new BadRequestException(error.message);
    }
  }
}
