import { Role } from './Role';
import { KartuTandaPenduduk } from './KartuTandaPenduduk';
import { Profile } from './Profile';

interface User {
  id?: number;
  username?: string;
  email?: string;
  role?: Role;
  image_url?: string;
  verified?: boolean;
  created_at?: number;
  updated_at?: number;
  kartu_tanda_penduduk_?: KartuTandaPenduduk;
  profile_?: Profile;
  session_token?: string;
}

export default User;
