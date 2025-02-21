import {
  BadRequestException,
  forwardRef,
  Inject,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './entities/user.entity';
import { Repository } from 'typeorm';
import { AuthService } from 'src/auth/auth.service';
import { UpdateUserDto } from './dto/update-user.dto';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User) private readonly userRepository: Repository<User>,
    @Inject(forwardRef(() => AuthService))
    private readonly authService: AuthService,
  ) {}

  async create(dto: CreateUserDto) {
    try {
      const user = this.userRepository.create(dto);
      const { password, ...result } = await this.userRepository.save(user);
      return result;
    } catch (error) {
      throw new BadRequestException(error);
    }
  }

  async update(dto: UpdateUserDto, id: number) {
    try {
      await this.findById(id);
      await this.userRepository.update(id, dto);

      return 'User updated';
    } catch (error) {
      throw new BadRequestException(error.message);
    }
  }

  async findByEmail(email: string) {
    const parsedEmail = email.toLocaleLowerCase();
    const user = await this.userRepository.findOne({
      where: { email: parsedEmail },
      select: ['password', 'id'],
    });

    if (!user)
      throw new NotFoundException(`User with email ${email} not found`);

    return user;
  }

  async findById(id: number) {
    const user = await this.userRepository.findOne({
      where: { id },
      select: ['password', 'id', 'name', 'email'],
    });

    if (!user) throw new NotFoundException(`User with ID ${id} not found`);

    return user;
  }

  async findByToken(token: string) {
    try {
      const id = await this.authService.decodeToken(token);
      return await this.findById(id);
    } catch (error) {
      throw new BadRequestException(error.message);
    }
  }
}
