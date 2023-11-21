import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UsersController } from './controllers/users.controller';
import { UsersService } from './services/users.service';
import { AuthService } from './services/auth.service';
import { Users } from './entities/users.entity';
import { GitRepositoriesService } from 'src/gitrepositories/services/gitrepositories.service';
import { GitRepositories } from 'src/gitrepositories/entities/gitrepositories.entity';
import { Historic } from 'src/gitrepositories/entities/historico.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Users, GitRepositories, Historic])],
  controllers: [UsersController],
  providers: [UsersService, AuthService, GitRepositoriesService]
})
export class UsersModule {}
