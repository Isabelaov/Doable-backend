import {
  BadRequestException,
  forwardRef,
  Inject,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';
import { LoginUserDto } from './dto/login.dto';
import { UserService } from 'src/user/user.service';
import { ConfigService } from '@nestjs/config';
import { User } from 'src/user/entities/user.entity';

@Injectable()
export class AuthService {
  constructor(
    private readonly jwtService: JwtService,
    @Inject(forwardRef(() => UserService))
    private readonly userService: UserService,
    private readonly configService: ConfigService,
  ) {}

  async login(dto: LoginUserDto) {
    try {
      const { email, password } = dto;
      const user = await this.userService.findByEmail(email);

      if (!(await bcrypt.compare(password, user.password))) {
        throw new UnauthorizedException('Invalid credentials');
      }

      const result: Omit<User, 'password'> = user;

      const payload = { id: user.id };
      return { token: this.jwtService.sign(payload), user: result };
    } catch (error) {
      console.error(error);

      throw new BadRequestException(error.message);
    }
  }

  async decodeToken(token: string) {
    try {
      const { iat, ...payload } = await this.jwtService.verifyAsync(token, {
        secret: this.configService.get<string>('JWT_SECRET'),
      });

      return payload;
    } catch (error) {
      throw new UnauthorizedException(error.message);
    }
  }
}
