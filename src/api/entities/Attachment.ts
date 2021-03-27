import { Entity, Column, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';

import { User } from './User';

@Entity({ name: 'attachment' })
export class Attachment {

  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ type: 'text', nullable: true })
  // tslint:disable-next-line: variable-name
  name: string;

  @Column({ type: 'varchar', length: 255 })
  ext: string;

  @Column({ type: 'int' })
  size: number;

  @Column({ type: 'int', default: 0 })
  // tslint:disable-next-line: variable-name
  download_count: number;

  @Column({ type: 'text', nullable: true, default: null })
  // tslint:disable-next-line: variable-name
  google_drive: string;

  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  // tslint:disable-next-line: variable-name
  created_at: number;

  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP', onUpdate: 'CURRENT_TIMESTAMP' })
  // tslint:disable-next-line: variable-name
  updated_at: number;

  @ManyToOne(type => User)
  // tslint:disable-next-line: variable-name
  user_: User;

  @ManyToOne(type => Attachment)
  // tslint:disable-next-line: variable-name
  parent_attachment_: Attachment;
}
