import { Users } from 'src/users/entities/users.entity';
import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  OneToOne,
  JoinColumn,
} from 'typeorm';

@Entity({ name: 'gitrepositories' })
export class GitRepositories {
  @PrimaryGeneratedColumn()
  id: number;

  @OneToOne(() => Users, (user) => user.id)
  @JoinColumn()
  userId: number;

  @Column({ length: 500 })
  nome: string;

  @Column('text')
  tagUsuario: string;

  @Column()
  qteSeguidores: number;

  @Column()
  qtePessoasSeguindo: number;

  @Column()
  qteRepositorios: number;

  @Column({ type: 'text', nullable: true })
  biografia: string;

  @Column({ type: 'text', nullable: true })
  email: string;

  @Column({ type: 'text', nullable: true })
  twitter: string;

  @Column({ type: 'text', nullable: true })
  nomeEmpresa: string;

  @Column({ type: 'text', nullable: true })
  website: string;

  @Column({ type: 'text', nullable: true })
  avatar: string;
}
