export class UserGitRepo {
  id: number;
  userId: number;
  nome: string;
  tagUsuario: string;
  qteSeguidores: number;
  qtePessoasSeguindo: number;
  qteRepositorios: number;
  biografia: string;
  email: string;
  twitter: string;
  nomeEmpresa: string;
  website: string;
  avatar: string;
}

export class AllRepo {
  name: string;
  qteRepositorios: number;
  repositorios: DetailsRepo[];
}

export class DetailsRepo {
  nameRepo: string;
  description: string;
  language: string;
  url: string;
}
