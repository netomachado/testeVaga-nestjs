import { Body, Controller, Get, Param, Post, UseGuards } from '@nestjs/common';
import { AuthGuard } from 'src/guards/auth.guard';
import { GitRepositoriesService } from '../services/gitrepositories.service';
import { GitRepositories } from '../entities/gitrepositories.entity';
import { AllRepo } from '../response/response-gitrepos.dto';
import { Historic } from '../entities/historico.entity';
import { DadosPesquisaRepo } from '../request/request-gitrepos.dto';

@Controller('gitrepositories')
@UseGuards(AuthGuard)
export class GitRepositoriesController {
  constructor(private gitRepositoriesService: GitRepositoriesService) {}

  @Get('/getuserrepository/:username')
  async getUserRepository(@Param('username') username: string): Promise<GitRepositories> {
    const userRepo = await this.gitRepositoriesService.findUserRepository(username);

    return userRepo;
  }

  @Post('/getallrepositories')
  async getAllRepositories(@Body() body: DadosPesquisaRepo): Promise<AllRepo> {
    const allRepo = await this.gitRepositoriesService.findAllRepositories(body);

    return allRepo;
  }

  @Get('/gethistory/:id')
  async getHistory(@Param('id') id: string): Promise<Historic[]> {
    const history = await this.gitRepositoriesService.findUserHistoric(+id);

    return history;
  }
}
