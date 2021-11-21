import {Entity, Column, PrimaryGeneratedColumn, ManyToOne, OneToOne, JoinColumn} from 'typeorm';

import { User } from './User';
import { Attachment } from './Attachment';

@Entity({ name: 'lesson' })
export class Lesson {

  @PrimaryGeneratedColumn('increment')
  id: number;

  @Column({ type: 'varchar', length: 255 })
  title: string;

  @Column({ type: 'text' })
  content: string;

  @Column({ type: 'text', nullable: true })
  image_url: string;

  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  created_at: number;

  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP', onUpdate: 'CURRENT_TIMESTAMP' })
  updated_at: number;

  @OneToOne(type => Attachment)
  @JoinColumn()
  attachment_: Attachment;

  @ManyToOne(type => User)
  user_: User;

  @ManyToOne(type => Lesson)
  parent_lesson_: Lesson;
}
