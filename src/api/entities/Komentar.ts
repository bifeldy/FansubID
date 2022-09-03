import { Entity, Column, PrimaryGeneratedColumn, ManyToOne, CreateDateColumn, UpdateDateColumn } from 'typeorm';

import { KomentarModel, UserModel } from '../../models/req-res.model';

import { User } from './User';

@Entity({ name: 'komentar' })
export class Komentar implements KomentarModel {

  @PrimaryGeneratedColumn('increment')
  id: number;

  @Column({ type: 'text' })
  comment: string;

  @Column({ type: 'varchar', length: 255 })
  path: string;

  @CreateDateColumn({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  created_at: number | Date;

  @UpdateDateColumn({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  updated_at: number | Date;

  @ManyToOne(type => Komentar)
  parent_komentar_: KomentarModel;

  @ManyToOne(type => User)
  user_: UserModel;

}
