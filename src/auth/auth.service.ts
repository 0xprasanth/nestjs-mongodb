import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UserService } from 'src/users/users.service';
import { v4 as uuidv4 } from 'uuid';
import { SigninDto } from './dto/SignIn.dto';

export type AuthInput = {
  username: string;
  password: string;
};

@Injectable()
export class AuthService {
  constructor(
    private userService: UserService,
    private jwtService: JwtService,
  ) {}

  async authenticate(input: AuthInput) {
    const user = await this.userService.getByUsername(input.username);
    if (!user) throw new UnauthorizedException();
    const accessToken = await this.singIn({
      userId: user._id.toString(),
      username: user.username,
    });
    return {
      accessToken,
      userId: user._id,
      user: user,
    };
  }
  async validateUser(input: AuthInput) {
    const user = await this.userService.getByUsername(input.username);

    if (user && user.password === input.password) {
      return {
        userId: user._id,
        username: user.username,
      };
    }
    return null;
  }

  async singIn(user: SigninDto) {
    const toknePayload = {
      sub: user.userId,
      username: user.username,
    };
    return this.jwtService.signAsync(toknePayload);
  }
}
