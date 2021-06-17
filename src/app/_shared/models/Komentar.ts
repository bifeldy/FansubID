
import User from './User';

export interface Komentar {
  id?: number;
  comment?: string;
  created_at?: number;
  updated_at?: number;
  reply?: Komentar[];
  user_?: User;
  parent_komentar_?: Komentar;
  show_reply?: boolean;
  reply_count?: number;
  reply_page?: number;
  reply_page_finised: boolean;
  reply_mode?: boolean;
  reply_to_send?: string;
};
