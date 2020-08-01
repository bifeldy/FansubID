import { Role } from './Role';

interface User {
  id: number;
  phone: string;
  role: Role;
  created_at: number;
  updated_at: number;

  nik: number;
  email: string;
  telepon: string;
  password: string;
  nama: string;
  tempat_lahir: string;
  tanggal_lahir: number;
  jenis_kelamin: string;
  golongan_darah: string;
  alamat: string;
  rt: number;
  rw: number;
  kelurahan_desa: string;
  kecamatan: string;
  agama: string;
  status_perkawinan: string;
  pekerjaan: string;
  kewarganegaraan: string;
}

export default User;
