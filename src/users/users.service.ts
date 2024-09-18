import { ConflictException, Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { User } from './user.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { CreateUserDto } from './create-user.dto';
import * as bcrypt from 'bcrypt';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User) private userRepository: Repository<User>,
  ) {}

  async create(createUserDto: CreateUserDto): Promise<User> {
    const { email, password, role } = createUserDto;

    const existingUser = this.findOneByEmail(email);

    if (existingUser) {
      throw new ConflictException('Користувач з таким email вже існує');
    }

    const hashedPassoword = await bcrypt.hash(password, 10);
    const user = this.userRepository.create({
      email,
      password: hashedPassoword,
      role,
    });
    return this.userRepository.save(user);
  }

  async findOneByEmail(email: string): Promise<User> {
    return this.userRepository.findOne({ where: { email } });
  }
}
