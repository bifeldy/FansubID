import { Entity, Column, JoinTable, ManyToMany, PrimaryGeneratedColumn } from 'typeorm';

import { AttachmentModel, MailboxModel } from '../../models/req-res.model';

import { Attachment } from './Attachment';

@Entity({ name: 'mailbox' })
export class Mailbox implements MailboxModel {

  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ type: 'text', unique: true })
  mail: string;

  @Column({ type: 'text' })
  from: string;

  @Column({ type: 'text' })
  to: string;

  @Column({ type: 'text', default: null })
  cc: string;

  @Column({ type: 'text', default: null })
  bcc: string;

  @Column({ type: 'text' })
  subject: string;

  @Column({ type: 'text', default: null })
  html: string;

  @Column({ type: 'text', default: null })
  text: string;

  @Column({ type: 'timestamp with time zone', default: () => 'CURRENT_TIMESTAMP' })
  date: number | Date;

  @ManyToMany(type => Attachment)
  @JoinTable()
  attachment_: AttachmentModel[];

}
