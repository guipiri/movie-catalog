import {
  ConflictException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { hashSync as bcryptHashSync } from 'bcrypt';
import { USER_ALREADY_EXISTS, USER_NOT_FOUND } from 'src/constants';
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
    const usernameExists = await this.userRepository.existsBy({ username });
    if (usernameExists) throw new ConflictException(USER_ALREADY_EXISTS);

    return await this.userRepository.save({
      username,
      password: bcryptHashSync(password, 10),
    });
  }

  async update(
    id: string,
    { username, password }: UpdateUserDto,
  ): Promise<void> {
    const usernameExists = await this.userRepository.existsBy({ username });
    if (usernameExists) throw new ConflictException(USER_ALREADY_EXISTS);

    const { affected } = await this.userRepository.update(id, {
      username,
      password: bcryptHashSync(password, 10),
    });
    if (!affected) {
      throw new NotFoundException(`${USER_NOT_FOUND} ${id}`);
    }
  }

  async remove(id: string): Promise<void> {
    const { affected } = await this.userRepository.delete(id);
    if (!affected) {
      throw new NotFoundException(`${USER_NOT_FOUND} ${id}`);
    }
  }
}
