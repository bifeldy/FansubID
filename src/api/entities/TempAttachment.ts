import { Entity, Column, PrimaryGeneratedColumn, ManyToOne, CreateDateColumn, UpdateDateColumn } from 'typeorm';

import { TempAttachmentModel, UserModel } from '../../models/req-res.model';

import { User } from './User';

@Entity({ name: 'temp_attachment' })
export class TempAttachment implements TempAttachmentModel {

  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ type: 'text' })
  name: string;

  @Column({ type: 'varchar', length: 255 })
  ext: string;
  
  @Column({ type: 'int' })
  size: number;

  @Column({ type: 'text', nullable: true })
  mime: string;

  @Column({ type: 'int', default: 0 })
  download_count: number;

  @CreateDateColumn({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  created_at: number | Date;

  @UpdateDateColumn({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  updated_at: number | Date;

  @ManyToOne(type => User)
  user_: UserModel;

}
