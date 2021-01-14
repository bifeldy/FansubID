import { Entity, Column, PrimaryGeneratedColumn, OneToOne, JoinColumn } from 'typeorm';
import { User } from './User';

@Entity({ name: 'banned' })
export class Banned {

  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ type: 'text' })
  reason: string;

  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  // tslint:disable-next-line: variable-name
  created_at: number;

  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP', onUpdate: 'CURRENT_TIMESTAMP' })
  // tslint:disable-next-line: variable-name
  updated_at: number;

  @OneToOne(type => User)
  @JoinColumn()
  // tslint:disable-next-line: variable-name
  user_: User;
}
