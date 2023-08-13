import { Entity, Column, ManyToOne, CreateDateColumn, UpdateDateColumn, PrimaryColumn } from 'typeorm';

import { DdlFileModel, UserModel } from '../../models/req-res.model';

import { User } from './User';

@Entity({ name: 'ddl_file' })
export class DdlFile implements DdlFileModel {

  @PrimaryColumn('text')
  id: string;

  @Column({ type: 'text' })
  name: string;

  @Column({ type: 'text' })
  url: string;

  @Column({ type: 'int' })
  size: number;

  @Column({ type: 'text', nullable: true })
  mime: string;

  @Column({ type: 'int', default: 0 })
  download_count: number;

  @Column({ type: 'text' })
  msg_id: string;

  @Column({ type: 'text', nullable: true })
  msg_parent: string;

  @Column({ type: 'int' })
  chunk_idx: number;

  @CreateDateColumn({ type: 'timestamp with time zone', default: () => 'CURRENT_TIMESTAMP' })
  created_at: number | Date;

  @UpdateDateColumn({ type: 'timestamp with time zone', default: () => 'CURRENT_TIMESTAMP' })
  updated_at: number | Date;

  @ManyToOne(type => User)
  user_: UserModel;

}
