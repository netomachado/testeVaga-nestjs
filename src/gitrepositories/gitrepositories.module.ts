import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { GitRepositoriesController } from './controllers/gitrepositories.controller';
import { GitRepositoriesService } from './services/gitrepositories.service';
import { GitRepositories } from './entities/gitrepositories.entity';
import { Historic } from './entities/historico.entity';
import { UsersService } from 'src/users/services/users.service';
import { AuthService } from 'src/users/services/auth.service';
import { Users } from 'src/users/entities/users.entity';

@Module({
  imports: [TypeOrmModule.forFeature([GitRepositories, Historic, Users])],
  controllers: [GitRepositoriesController],
  providers: [GitRepositoriesService, UsersService, AuthService]
})
export class GitRepositoriesModule {}
