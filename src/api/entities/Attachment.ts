import { Entity, Column, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';

import { User } from './User';

@Entity({ name: 'attachment' })
export class Attachment {

  @PrimaryGeneratedColumn('increment')
  id: number;

  @Column({ type: 'text', nullable: true })
  // tslint:disable-next-line: variable-name
  name: string;

  @Column({ type: 'varchar', length: 255 })
  ext: string;

  @Column({ type: 'int' })
  size: number;

  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  // tslint:disable-next-line: variable-name
  created_at: number;

  // @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP', onUpdate: 'CURRENT_TIMESTAMP' })
  // // tslint:disable-next-line: variable-name
  // updated_at: number;

  @ManyToOne(type => User)
  // tslint:disable-next-line: variable-name
  user_: User;
}
