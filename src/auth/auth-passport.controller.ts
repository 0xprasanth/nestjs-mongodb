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
import { PassportLocalGaurd } from './guards/passport-local.guard';
import { PassportJwtAuthGaurd } from './guards/passport-jwt.gaurd';

@Controller('authv2')
export class PassportAuthController {
  constructor(
    private authService: AuthService,
    private userService: UserService,
  ) {}

  @HttpCode(HttpStatus.OK)
  @Post('login')
  @UseGuards(PassportLocalGaurd)
  login(@Request() request) {
    // return 'success';
    return this.authService.authenticate(request.user);
  }

  @Get('about')
  @UseGuards(PassportJwtAuthGaurd)
  async getUserInfo(
    @Request() request: { user: { userId: string; username: string } },
  ) {
    return this.userService.getUserById(request.user.userId);
  }
  @Get('test')
  test() {
    return 'Working - /v2/auth/test';
  }
}
