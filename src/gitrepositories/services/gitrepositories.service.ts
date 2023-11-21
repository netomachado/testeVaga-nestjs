import { Injectable } from '@nestjs/common';
import axios from 'axios';
import { InjectRepository } from '@nestjs/typeorm';
import { GitRepositories } from '../entities/gitrepositories.entity';
import { Repository } from 'typeorm';
import { AllRepo } from '../response/response-gitrepos.dto';
import { Historic } from '../entities/historico.entity';
import { DadosPesquisaRepo } from '../request/request-gitrepos.dto';

const githubapi = axios.create({
  baseURL: 'https://api.github.com',
  headers: {
    'Content-Type': 'application/json',
    Accept: 'application/vnd.github.v3+json',
  },
});

@Injectable()
export class GitRepositoriesService {
  constructor(
    @InjectRepository(GitRepositories)
    private gitRepositoriesRepository: Repository<GitRepositories>,
    @InjectRepository(Historic)
    private historicRepository: Repository<Historic>,
  ) {}

  async saveUserRepository(username: string, id: number): Promise<any> {
    const response = await githubapi.get(`/users/${username}`);
    const repositories = response.data;

    if (repositories) {
      const repositoryToSave = new GitRepositories();
      repositoryToSave.nome = repositories.login;
      repositoryToSave.tagUsuario = repositories.login;
      repositoryToSave.qteSeguidores = repositories.followers;
      repositoryToSave.qtePessoasSeguindo = repositories.following;
      repositoryToSave.qteRepositorios = repositories.public_repos;
      repositoryToSave.biografia = repositories.bio;
      repositoryToSave.email = repositories.email;
      repositoryToSave.twitter = repositories.twitter_username;
      repositoryToSave.nomeEmpresa = repositories.company;
      repositoryToSave.website = repositories.blog;
      repositoryToSave.avatar = repositories.avatar_url;
      repositoryToSave.userId = id;

      const repoSaved =
        await this.gitRepositoriesRepository.create(repositoryToSave);
      const responseSaved =
        await this.gitRepositoriesRepository.save(repoSaved);

      return responseSaved;
    } else {
      return null;
    }
  }

  async findUserRepository(username: string): Promise<GitRepositories> {
    const repository = await this.gitRepositoriesRepository.findOne({
      where: { nome: username },
    });
    return repository;
  }

  async findAllRepositories(body: DadosPesquisaRepo): Promise<AllRepo> {
    if (body.username) {
      const response = await githubapi.get(`/users/${body.username}/repos`);
      const repositories = response.data;

      const allRepo = {
        name: body.username,
        qteRepositorios: repositories.length,
        repositorios: repositories.map((repo) => {
          return {
            nameRepo: repo.name,
            description: repo.description,
            language: repo.language,
            url: repo.html_url,
          };
        }),
      };

      if (repositories) {
        const historicData = new Historic();
        historicData.userId = +body.id;
        historicData.datahora = new Date();
        historicData.username = body.username;
        historicData.status = 'success';
        historicData.qteRepositorios = repositories.length;

        const historicSearch =
        await this.historicRepository.save(historicData);
      }

      return allRepo;
    } else {
      return null;
    }
  }

  async findUserHistoric(id: number): Promise<Historic[]> {
    const historic = await this.historicRepository.find({
      where: { userId: id },
      order: {
        datahora: 'DESC',
      },
      take: 20,
    });
    return historic;
  }
}
