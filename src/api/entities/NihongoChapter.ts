import {Entity, Column, PrimaryGeneratedColumn, ManyToOne, OneToOne, JoinColumn} from 'typeorm';

import { User } from './User';
import { NihongoBook } from './NihongoBook';
import { Attachment } from './Attachment';

@Entity({ name: 'nihongo_chapter' })
export class NihongoChapter {

  @PrimaryGeneratedColumn('increment')
  id: number;

  @Column({ type: 'varchar', length: 255 })
  title: string;

  @Column({ type: 'text' })
  content: string;

  @Column({ type: 'text', nullable: true })
  // tslint:disable-next-line: variable-name
  image_url: string;

  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  // tslint:disable-next-line: variable-name
  created_at: number;

  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP', onUpdate: 'CURRENT_TIMESTAMP' })
  // tslint:disable-next-line: variable-name
  updated_at: number;

  @OneToOne(type => Attachment)
  @JoinColumn()
  // tslint:disable-next-line: variable-name
  attachment_: Attachment;

  @ManyToOne(type => NihongoBook)
  // tslint:disable-next-line: variable-name
  book_: NihongoBook;

  @ManyToOne(type => User)
  // tslint:disable-next-line: variable-name
  user_: User;
}
