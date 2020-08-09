import { Role } from './Role';
import { KartuTandaPenduduk } from './KartuTandaPenduduk';

interface User {
  id: number;
  username: string;
  email: string;
  role: Role;
  image_url: string;
  verified: boolean;
  created_at: number;
  updated_at: number;
  kartu_tanda_penduduk_: KartuTandaPenduduk;
}

export default User;
