import {
  ConflictException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { hashSync as bcryptHashSync } from 'bcrypt';
import { Repository } from 'typeorm';
import { UserDto } from './user.dto';
import { User } from './user.entity';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User) private userRepository: Repository<User>,
  ) {}

  async create({ username, password }: UserDto): Promise<User> {
    const newUser = this.userRepository.create({
      username,
      password: bcryptHashSync(password, 10),
    });
    try {
      return await this.userRepository.save(newUser);
    } catch (error) {
      if (error.code === '23505') {
        throw new ConflictException('username already exists');
      }
    }
  }

  async findAll() {
    const users = await this.userRepository.find();
    return users;
  }

  async finOne(username: string): Promise<User | null> {
    const user = await this.userRepository.findOneBy({ username });
    if (!user) {
      throw new NotFoundException(
        `user with ${username} username does not exists`,
      );
    }

    return user;
  }
}
