import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity({ name: 'tatoeba' })
export class Tatoeba {

  @PrimaryGeneratedColumn('increment')
  id: number;

  @Column({ type: 'text', nullable: true })
  phrase: string;

  @Column({ type: 'text', nullable: true })
  kanji: string;

  @Column({ type: 'text', nullable: true })
  flags: string;

  @Column({ type: 'text', nullable: true })
  translate: string;

  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  // eslint-disable-next-line @typescript-eslint/naming-convention,no-underscore-dangle,id-blacklist,id-match
  created_at: number;

  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP', onUpdate: 'CURRENT_TIMESTAMP' })
  // eslint-disable-next-line @typescript-eslint/naming-convention, no-underscore-dangle, id-blacklist, id-match
  updated_at: number;
}
