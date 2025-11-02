import {
  Body,
  Controller,
  Get,
  HttpCode,
  HttpStatus,
  NotImplementedException,
  Post,
  UseGuards,
  UsePipes,
  ValidationPipe,
  Request,
  NotFoundException,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { LoginDto } from './dto/Login.dto';
import { UserService } from 'src/users/users.service';
import { AuthGaurd } from './guards/auth.guard';

@Controller('auth')
export class AuthController {
  constructor(
    private authService: AuthService,
    private userService: UserService,
  ) {}

  @HttpCode(HttpStatus.OK)
  @Post('login')
  @UsePipes(new ValidationPipe())
  login(@Body() loginInput: LoginDto) {
    return this.authService.authenticate(loginInput);
  }

  @UseGuards(AuthGaurd)
  @Get('about')
  async getUserInfo(@Request() req) {
    const user = await this.userService.getUserById(req.user.userId);
    if (!user) throw new NotFoundException();
    return user;
  }
}
