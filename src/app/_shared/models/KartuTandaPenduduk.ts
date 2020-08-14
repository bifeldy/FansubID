import { WargaNegara } from './WargaNegara';
import { GolonganDarah } from './GolonganDarah';
import { Agama } from './Agama';

export interface KartuTandaPenduduk {
  nik?: number;
  nama?: string;
  tempat_lahir?: string;
  tanggal_lahir?: Date;
  jenis_kelamin?: string;
  golongan_darah?: GolonganDarah;
  alamat?: string;
  rt?: number;
  rw?: number;
  kelurahan_desa?: string;
  kecamatan?: string;
  agama?: Agama;
  status_perkawinan?: string;
  pekerjaan?: string;
  kewarganegaraan?: WargaNegara;
  created_at?: Date;
  updated_at?: Date;
}
