import { Entity, Column, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';

import { User } from './User';

@Entity({ name: 'attachment' })
export class Attachment {

  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ type: 'text', nullable: true })
  name: string;

  @Column({ type: 'varchar', length: 255 })
  ext: string;

  @Column({ type: 'int' })
  size: number;

  @Column({ type: 'int', default: 0 })
  download_count: number;

  @Column({ type: 'text', nullable: true, default: null })
  google_drive: string;

  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  created_at: number;

  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP', onUpdate: 'CURRENT_TIMESTAMP' })
  updated_at: number;

  @ManyToOne(type => User)
  user_: User;

  @ManyToOne(type => Attachment)
  parent_attachment_: Attachment;
}
