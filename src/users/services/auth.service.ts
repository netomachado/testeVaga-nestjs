import { BadRequestException, Injectable } from '@nestjs/common';
import { UsersService } from './users.service';
import { randomBytes, scrypt as _scrypt } from 'crypto';
import { promisify } from 'util';
import { sign } from 'jsonwebtoken';
import { CreateUserDto } from '../request/request-user.dto';
import { IUser, IUserToken } from '../response/response-user.dto';
import { GitRepositoriesService } from 'src/gitrepositories/services/gitrepositories.service';

const scrypt = promisify(_scrypt);

@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService,
    private gitRepositoriesService: GitRepositoriesService,
  ) {}

  async signup(email: string, password: string, username: string ) {
    const userExist = await this.usersService.find(email);

    if (userExist.length) {
      throw new BadRequestException('email in use');
    }

    const salt = randomBytes(8).toString('hex');
    const hash = (await scrypt(password, salt, 32)) as Buffer;

    const result = salt + '.' + hash.toString('hex');

    const CreateUserDto = {
      username: username,
      email: email,
      password: result,
    } as CreateUserDto;

    const user = await this.usersService.createUser(CreateUserDto);

    return user;
  }

  async signin(email: string, password: string) {
    const userExist = await this.usersService.findOne(email);

    if (!userExist) {
      throw new BadRequestException('user not found');
    }
    const [salt, storedHash] = userExist.password.split('.');

    const hash = (await scrypt(password, salt, 32)) as Buffer;

    if (storedHash !== hash.toString('hex')) {
      throw new BadRequestException('bad password');
    }

    const token = sign(
      {
        username: userExist.username,
        email: userExist.email,
      },
      // process.env.JWT_SECRET as string,
      'testefullstackecotracegitrepositories',
      {
        subject: userExist.id.toString(),
        expiresIn: '1d',
      },
    );

    const repoUser = await this.gitRepositoriesService.findUserRepository(
      userExist.username,
    );
    const response = {
      id: userExist.id,
      username: userExist.username,
      email: userExist.email,
      token: token,
      avatar: repoUser.avatar,
    } as IUserToken;

    return response;
  }
}
