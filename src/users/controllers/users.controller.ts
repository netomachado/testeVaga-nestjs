import { Body, Controller, Post, NotFoundException } from '@nestjs/common';
import { CreateUserDto, SigninUserDto } from '../request/request-user.dto';
import { UsersService } from '../services/users.service';
import { IUser, IUserToken } from '../response/response-user.dto';
import { AuthService } from '../services/auth.service';

@Controller('users')
export class UsersController {
  constructor(
    private usersService: UsersService,
    private authService: AuthService,
  ) {}

  @Post('/signup')
  async createUser(@Body() body: CreateUserDto): Promise<IUser> {
    const response = await this.authService.signup(
      body.email,
      body.password,
      body.username,
    );
    if (!response) {
      throw new NotFoundException('User not created');
    }
    return response;
  }

  @Post('/signin')
  async signin(@Body() body: SigninUserDto): Promise<IUserToken> {
    const response = await this.authService.signin(body.email, body.password);
    if (!response) {
      throw new NotFoundException('User not found');
    }

    return response;
  }
}
