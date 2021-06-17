
import User from './User';

export interface Komentar {
  id?: number;
  comment?: string;
  created_at?: number;
  updated_at?: number;
  reply_count?: number;
  reply_page?: number;
  user?: User;
  reply?: Komentar[];
};
