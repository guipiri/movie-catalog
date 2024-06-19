import {
  BadRequestException,
  ConflictException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { hashSync as bcryptHashSync } from 'bcrypt';
import { isUUID } from 'class-validator';
import {
  MALFORMED_UUID,
  USER_ALREADY_EXISTS,
  USER_NOT_FOUND,
} from 'src/constants';
import { Repository } from 'typeorm';
import { UpdateUserDto, UserDto } from './user.dto';
import { User } from './user.entity';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User) private userRepository: Repository<User>,
  ) {}

  async findAll(): Promise<User[]> {
    return await this.userRepository.find();
  }

  async finOne(username: string): Promise<User> {
    const user = await this.userRepository.findOneBy({ username });
    if (!user) {
      throw new NotFoundException(`${USER_NOT_FOUND} ${username}`);
    }
    return user;
  }

  async create({ username, password }: UserDto): Promise<User> {
    const newUser = this.userRepository.create({
      username,
      password: bcryptHashSync(password, 10),
    });
    try {
      return await this.userRepository.save(newUser);
    } catch (error) {
      if (error.code === '23505') {
        throw new ConflictException(`${USER_ALREADY_EXISTS} ${username}`);
      }
    }
  }

  async update(id: string, user: UpdateUserDto): Promise<void> {
    if (!isUUID(id)) {
      throw new BadRequestException(MALFORMED_UUID);
    }

    const { affected } = await this.userRepository.update(id, user);
    if (!affected) {
      throw new NotFoundException(`${USER_NOT_FOUND} ${id}`);
    }
    return;
  }

  async remove(id: string): Promise<void> {
    const { affected } = await this.userRepository.delete(id);
    if (!affected) {
      throw new NotFoundException(`${USER_NOT_FOUND} ${id}`);
    }
  }
}
