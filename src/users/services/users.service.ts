import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateUserDto } from '../request/request-user.dto';
import { IUser } from '../response/response-user.dto';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { Users } from '../entities/users.entity';
import { GitRepositoriesService } from 'src/gitrepositories/services/gitrepositories.service';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(Users)
    private usersRepository: Repository<Users>,
    private gitRepositoriesService: GitRepositoriesService,
  ) {}

  async createUser(body: CreateUserDto): Promise<IUser> {
    const { email, password, username } = body;

    const user = new Users();
    user.username = username;
    user.email = email;
    user.password = password;

    const usercreated = await this.usersRepository.create(user);
    const response = await this.usersRepository.save(usercreated);

    if (response) {
      const reposaved = await this.gitRepositoriesService.saveUserRepository(
        response.username,
        response.id,
      );

      const userSaved = {
        id: response.id,
        username: response.username,
        email: response.email,
        avatar: reposaved.avatar,
      } as IUser;

      return userSaved;
    } else {
      throw new NotFoundException('User not created');
    }
  }

  async find(email: string): Promise<Users[]> {
    const user = await this.usersRepository.find({ where: { email } });
    if (!user) {
      throw new NotFoundException('User not found');
    }
    return user;
  }

  async findOne(email: string): Promise<Users> {
    const user = await this.usersRepository.findOne({ where: { email } });
    if (!user) {
      throw new NotFoundException('User not found');
    }
    return user;
  }
}
