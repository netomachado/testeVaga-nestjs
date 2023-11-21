import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity({ name: 'historic' })
export class Historic {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  userId: number;

  @Column()
  datahora: Date;

  @Column('text')
  username: string;

  @Column('text')
  status: string;

  @Column()
  qteRepositorios: number;
}
