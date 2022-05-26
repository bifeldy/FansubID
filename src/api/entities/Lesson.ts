import { Entity, Column, PrimaryGeneratedColumn, ManyToOne, OneToOne, JoinColumn } from 'typeorm';

import { AttachmentModel, LessonModel, UserModel } from '../../models/req-res.model';

import { User } from './User';
import { Attachment } from './Attachment';

@Entity({ name: 'lesson' })
export class Lesson implements LessonModel {

  @PrimaryGeneratedColumn('increment')
  id: number;

  @Column({ type: 'varchar', length: 255 })
  title: string;

  @Column({ type: 'text' })
  content: string;

  @Column({ type: 'text', default: '/favicon.ico' })
  image_url: string;

  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  created_at: number;

  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP', onUpdate: 'CURRENT_TIMESTAMP' })
  updated_at: number;

  @OneToOne(type => Attachment)
  @JoinColumn()
  attachment_: AttachmentModel;

  @ManyToOne(type => User)
  user_: UserModel;

  @ManyToOne(type => Lesson)
  parent_lesson_: LessonModel;

}
