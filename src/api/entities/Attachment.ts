import { Exclude } from 'class-transformer';
import { Entity, Column, ManyToOne, PrimaryGeneratedColumn, CreateDateColumn, UpdateDateColumn, DeleteDateColumn } from 'typeorm';

import { AttachmentModel, UserModel } from '../../models/req-res.model';

import { User } from './User';

@Entity({ name: 'attachment' })
export class Attachment implements AttachmentModel {

  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ type: 'text' })
  name: string;

  @Column({ type: 'text', nullable: true })
  orig: string;

  @Column({ type: 'text' })
  ext: string;

  @Column({ type: 'int' })
  size: number;

  @Column({ type: 'text', nullable: true })
  mime: string;

  @Column({ type: 'int', default: 0 })
  download_count: number;

  @Column({ type: 'text', nullable: true })
  google_drive: string;

  @Column({ type: 'text', nullable: true })
  discord: string;

  @Column({ type: 'boolean', default: true })
  pending: boolean;

  @CreateDateColumn({ type: 'timestamp with time zone', default: () => 'CURRENT_TIMESTAMP' })
  created_at: number | Date;

  @UpdateDateColumn({ type: 'timestamp with time zone', default: () => 'CURRENT_TIMESTAMP' })
  updated_at: number | Date;

  @Exclude()
  @DeleteDateColumn({ type: 'timestamp with time zone' })
  deleted_at: number | Date;

  @ManyToOne(type => User)
  user_: UserModel;

  @ManyToOne(type => Attachment)
  parent_attachment_: AttachmentModel;

}
