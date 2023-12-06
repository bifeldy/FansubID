import { Entity, Column, PrimaryGeneratedColumn, ManyToOne, CreateDateColumn, UpdateDateColumn, Index } from 'typeorm'

import { TempAttachmentModel, UserModel } from '../../models/req-res.model';

import { User } from './User';

@Entity({ name: 'temp_attachment' })
export class TempAttachment implements TempAttachmentModel {

  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ type: 'text' })
  name: string;

  @Column({ type: 'text', nullable: true })
  orig: string;

  @Column({ type: 'text' })
  ext: string;

  @Column({ type: 'bigint' })
  size: number;

  @Column({ type: 'text', nullable: true })
  mime: string;

  @CreateDateColumn({ type: 'timestamp with time zone', default: () => 'CURRENT_TIMESTAMP' })
  @Index()
  created_at: number | Date;

  @UpdateDateColumn({ type: 'timestamp with time zone', default: () => 'CURRENT_TIMESTAMP' })
  updated_at: number | Date;

  @ManyToOne(type => User)
  user_: UserModel;

}
