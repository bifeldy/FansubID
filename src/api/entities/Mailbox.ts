import { Entity, Column, JoinTable, ManyToMany } from 'typeorm';

import { AttachmentModel, MailboxModel } from '../../models/req-res.model';

import { Attachment } from './Attachment';

@Entity({ name: 'mailbox' })
export class Mailbox implements MailboxModel {

  @Column({ type: 'text', primary: true })
  id: string;

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

  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  date: number | Date;

  @ManyToMany(type => Attachment)
  @JoinTable()
  attachment_: AttachmentModel[];

}