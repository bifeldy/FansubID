import { Entity, Column } from 'typeorm';

@Entity({ name: 'hirakata' })
export class Hirakata {

  @Column({ primary: true, type: 'varchar', length: 255 })
  romaji: string;

  @Column({ type: 'text' })
  hiragana: string;

  @Column({ type: 'text' })
  katakana: string;

  @Column({ type: 'text' })
  category: string;

  @Column({ type: 'text' })
  segment: string;

  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  // eslint-disable-next-line @typescript-eslint/naming-convention,no-underscore-dangle,id-blacklist,id-match
  created_at: number;

  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP', onUpdate: 'CURRENT_TIMESTAMP' })
  // eslint-disable-next-line @typescript-eslint/naming-convention, no-underscore-dangle, id-blacklist, id-match
  updated_at: number;
}
