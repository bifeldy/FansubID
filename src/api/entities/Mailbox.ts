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

  @Column({ type: 'text', nullable: true })
  to: string;

  @Column({ type: 'text', nullable: true })
  cc: string;

  @Column({ type: 'text', nullable: true })
  bcc: string;

  @Column({ type: 'text', nullable: true })
  subject: string;

  @Column({ type: 'text', nullable: true })
  html: string;

  @Column({ type: 'text', nullable: true })
  text: string;

  @Column({ type: 'timestamp with time zone', default: () => 'CURRENT_TIMESTAMP' })
  date: number | Date;

  @ManyToMany(type => Attachment)
  @JoinTable()
  attachment_: AttachmentModel[];

}
