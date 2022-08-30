import { Entity, Column, JoinTable, ManyToMany } from 'typeorm';

import { AttachmentModel, MailboxModel } from '../../models/req-res.model';

import { Attachment } from './Attachment';

@Entity({ name: 'mailbox' })
export class Mailbox implements MailboxModel {

  @Column({ type: 'text', primary: true })
  id: string;

  @Column({ type: 'varchar', length: 255 })
  from: string;

  @Column({ type: 'varchar', length: 255 })
  to: string;

  @Column({ type: 'varchar', length: 255 })
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
