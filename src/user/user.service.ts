import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './entities/user.entity';
import { Repository } from 'typeorm';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User) private readonly userRepository: Repository<User>,
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
}
