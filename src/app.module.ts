import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UsersModule } from './users/users.module';
import { GitRepositoriesModule } from './gitrepositories/gitrepositories.module';
import { Users } from './users/entities/users.entity';
import { GitRepositories } from './gitrepositories/entities/gitrepositories.entity';
import { Historic } from './gitrepositories/entities/historico.entity';
import { AppController } from './app.controller';
import { AppService } from './app.service';

@Module({
  imports: [TypeOrmModule.forRoot({
    type: 'postgres',
    host: 'localhost',
    port: 5432,
    username: 'postgres',
    password: '070807',
    database: 'testeecotrace',
    entities: [Users, GitRepositories, Historic],
    synchronize: true,
  }),
  UsersModule, GitRepositoriesModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
