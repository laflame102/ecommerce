import { ConflictException, Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { User } from './user.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { CreateUserDto } from './create-user.dto';
import * as bcrypt from 'bcrypt';
import { UpdateUserDto } from './update-user.dto';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User) private userRepository: Repository<User>,
  ) {}

  async create(createUserDto: CreateUserDto): Promise<User> {
    const { email, password, role } = createUserDto;

    const existingUser = await this.findOneByEmail(email);

    if (existingUser) {
      throw new ConflictException('Користувач з таким email вже існує');
    }

    const hashedPassoword = await bcrypt.hash(password, 10);
    const user = this.userRepository.create({
      email,
      password: hashedPassoword,
      role,
    });
    console.log(user);
    return this.userRepository.save(user);
  }

  async findOneByEmail(email: string): Promise<User> {
    const user = this.userRepository.findOne({where:{email}});
    console.log(await user);
    return user;
  }

  async update(id: number, updateUserDto: UpdateUserDto): Promise<void> {
    const { password, profile } = updateUserDto;
    const hashedPassword = password
      ? await bcrypt.hash(password, 10)
      : undefined;
    await this.userRepository.update(id, {
      ...(password && { password: hashedPassword }),
      ...(profile && { profile }),
    });
  }

  async remove(id: number): Promise<void> {
    await this.userRepository.delete(id);
  }
}
