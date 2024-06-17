import { Injectable, UnauthorizedException } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';
import { compareSync as bcryptCompareSync } from 'bcrypt';
import { UserDto } from 'src/user/user.dto';
import { UserService } from 'src/user/user.service';
import { AuthDto } from './auth.dto';

@Injectable()
export class AuthService {
  private expiresIn: number;
  constructor(
    private readonly jwtService: JwtService,
    private readonly userService: UserService,
    private readonly configService: ConfigService,
  ) {
    this.expiresIn = configService.get<number>('JWT_EXPIRATION_SECONDS');
  }

  async signIn({ username, password }: UserDto): Promise<AuthDto> {
    const user = await this.userService.finOne(username);

    if (!bcryptCompareSync(password, user.password))
      throw new UnauthorizedException();
    const payload = {
      sub: user.id,
      username: user.username,
    };
    return {
      token: this.jwtService.sign(payload),
      expiresIn: this.expiresIn,
    };
  }
}
