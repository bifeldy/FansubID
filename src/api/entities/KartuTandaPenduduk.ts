import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

enum JenisKelamin {
  LAKI = 'L',
  PEREMPUAN = 'P'
}

enum GolonganDarah {
  A = 'A',
  B = 'B',
  O = 'O',
  AB = 'AB'
}

enum Agama {
  BUDDHA = 'Buddha',
  HINDU = 'Hindu',
  ISLAM = 'Islam',
  KATHOLIK = 'Katholik',
  KONG_HU_CU = 'Kong Hu Cu',
  KRISTEN_PROTESTAN = 'Kristen Protestan'
}

enum WargaNegara {
  WNI = 'WNI',
  WNA = 'WNA'
}

@Entity({ name: 'kartu_tanda_penduduk' })
export class KartuTandaPenduduk {

  @PrimaryGeneratedColumn('increment')
  id: number;

  @Column({ type: 'bigint', nullable: true })
  nik: string;

  @Column({ type: 'varchar', length: 255 })
  nama: string;

  @Column({ type: 'varchar', length: 255, nullable: true })
  // tslint:disable-next-line: variable-name
  tempat_lahir: string;

  @Column({ type: 'date', nullable: true })
  // tslint:disable-next-line: variable-name
  tanggal_lahir: Date;

  @Column({ type: 'enum', enum: ['L', 'P'], nullable: true })
  // tslint:disable-next-line: variable-name
  jenis_kelamin: JenisKelamin;

  @Column({ type: 'enum', enum: ['A', 'B', 'O', 'AB'], nullable: true })
  // tslint:disable-next-line: variable-name
  golongan_darah: GolonganDarah;

  @Column({ type: 'varchar', length: 255, nullable: true })
  alamat: string;

  @Column({ type: 'tinyint', nullable: true })
  rt: number;

  @Column({ type: 'tinyint', nullable: true })
  rw: number;

  @Column({ type: 'varchar', length: 255, nullable: true })
  // tslint:disable-next-line: variable-name
  kelurahan_desa: string;

  @Column({ type: 'varchar', length: 255, nullable: true })
  kecamatan: string;

  @Column({
    type: 'enum',
    enum: ['Buddha', 'Hindu', 'Islam', 'Katholik', 'Kong Hu Cu', 'Kristen Protestan'],
    nullable: true
  })
  agama: Agama;

  @Column({ type: 'varchar', length: 255, nullable: true })
  // tslint:disable-next-line: variable-name
  status_perkawinan: string;

  @Column({ type: 'varchar', length: 255, nullable: true })
  pekerjaan: string;

  @Column({ type: 'enum', enum: ['WNI', 'WNA'], nullable: true })
  kewarganegaraan: WargaNegara;

  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  // tslint:disable-next-line: variable-name
  created_at: number;

  // @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP', onUpdate: 'CURRENT_TIMESTAMP' })
  // // tslint:disable-next-line: variable-name
  // updated_at: number;
}
