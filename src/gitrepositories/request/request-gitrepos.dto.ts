import { IsNotEmpty, IsOptional } from 'class-validator';

export class CreateGitRepoDto {
  @IsOptional()
  nome: string;

  @IsOptional()
  tagUsuario: string;

  @IsOptional()
  qteSeguidores: number;

  @IsOptional()
  qtePessoasSeguindo: number;

  @IsOptional()
  qteRepositorios: number;

  @IsOptional()
  biografia: string;

  @IsOptional()
  email: string;

  @IsOptional()
  twitter: string;

  @IsOptional()
  nomeEmpresa: string;

  @IsOptional()
  website: string;

  @IsNotEmpty()
  userIdId: number;
}

export interface DadosPesquisaRepo {
  username: string;
  id: number;
}
