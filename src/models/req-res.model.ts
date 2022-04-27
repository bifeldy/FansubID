export interface JsonDefault {
  id?: string;
  title?: string;
  name?: string;
  message?: string;
  jwtToken?: string;
  url?: string;
  mime?: string;
  extension?: string;
  size?: number;
  time?: number;
  expiration?: number;
  data?: any;
  myReport?: any;
  statistics?: any;
}

export interface JsonResponse<T = JsonDefault> {
  info: string;
  result?: T;
  jwtToken?: string;
  imageUrl?: string;
}

export interface JsonResponseArray<T = any> {
  info: string;
  results?: T[];
  count?: number;
  pages?: number;
}

export interface JsonResponseMulti<T> {
  info: string;
  result?: T;
  results?: T[];
  count?: number;
  pages?: number;
}

export enum RoleModel {
  ADMIN = 'ADMIN',
  FANSUBBER = 'FANSUBBER',
  MODERATOR = 'MODERATOR',
  USER = 'USER'
}

export enum JenisKelaminModel {
  LAKI = 'L',
  PEREMPUAN = 'P'
}

export enum GolonganDarahModel {
  A = 'A',
  B = 'B',
  AB = 'AB',
  O = 'O'
}

export enum AgamaModel {
  BUDDHA = 'Buddha',
  HINDU = 'Hindu',
  ISLAM = 'Islam',
  KATHOLIK = 'Katholik',
  KONG_HU_CU = 'Kong Hu Cu',
  KRISTEN_PROTESTAN = 'Kristen Protestan'
}

export enum WargaNegaraModel {
  WNA = 'WNA',
  WNI = 'WNI',
}

export enum LikeAndDislikeModel {
  LIKE = 'LIKE',
  DISLIKE = 'DISLIKE'
}

export enum SosMedModel {
  DISCORD = 'DISCORD',
  DISQUS = 'DISQUS',
  FACEBOOK = 'FACEBOOK',
  GOOGLE = 'GOOGLE'
}

export interface ProfileModel {
  id?: number;
  description?: string;
  cover_url?: string;
  view_count?: number;
  like_count?: number;
  points?: number;
  created_at?: number | Date;
  updated_at?: number | Date;
}

export interface KartuTandaPendudukModel {
  id?: number;
  nik?: number;
  nama?: string;
  tempat_lahir?: string;
  tanggal_lahir?: Date;
  jenis_kelamin?: JenisKelaminModel;
  golongan_darah?: GolonganDarahModel;
  alamat?: string;
  rt?: number;
  rw?: number;
  kelurahan_desa?: string;
  kecamatan?: string;
  agama?: AgamaModel;
  status_perkawinan?: string;
  pekerjaan?: string;
  kewarganegaraan?: WargaNegaraModel;
  created_at?: number | Date;
  updated_at?: number | Date;
}

export interface UserModel {
  id?: number;
  username?: string;
  email?: string;
  image_url?: string;
  role?: RoleModel;
  password?: string;
  verified?: boolean;
  discord?: string;
  session_token?: string;
  created_at?: number | Date;
  updated_at?: number | Date;
  kartu_tanda_penduduk_?: KartuTandaPendudukModel;
  profile_?: ProfileModel;
}

export interface ApiKeyModel {
  id?: number;
  name?: string;
  ip_domain?: string;
  api_key?: string;
  created_at?: number | Date;
  updated_at?: number | Date;
  user_?: UserModel;
}

export interface AttachmentModel {
  id?: string;
  name?: string;
  ext?: string;
  size?: number;
  download_count?: number;
  google_drive?: string;
  created_at?: number | Date;
  updated_at?: number | Date;
  user_?: UserModel;
  parent_attachment_?: AttachmentModel;
}

export interface BannedModel {
  id?: string;
  reason?: string;
  created_at?: number | Date;
  updated_at?: number | Date;
  user_?: UserModel;
  banned_by_?: UserModel;
}

export interface ProjectTypeModel {
  id?: number;
  name?: string;
  description?: string;
  image_url?: string;
  created_at?: number | Date;
  updated_at?: number | Date;
}

export interface AnimeModel {
  id?: number;
  name?: string;
  type?: string;
  image_url?: string;
  created_at?: number | Date;
  updated_at?: number | Date;
}

export interface DoramaModel {
  id?: number;
  slug?: string;
  name?: string;
  type?: string;
  image_url?: string;
  created_at?: number | Date;
  updated_at?: number | Date;
}

export interface FansubModel {
  id?: number;
  name?: string;
  description?: string;
  slug?: string;
  born?: Date;
  active?: boolean;
  urls?: string;
  tags?: string;
  image_url?: string;
  view_count?: number;
  like_count?: number;
  created_at?: number | Date;
  updated_at?: number | Date;
  user_?: UserModel;
}

export interface BerkasModel {
  id?: string;
  name?: string;
  description?: string;
  private?: boolean;
  download_url?: string;
  image_url?: string;
  view_count?: number;
  like_count?: number;
  created_at?: number | Date;
  updated_at?: number | Date;
  project_type_?: ProjectTypeModel;
  anime_?: AnimeModel;
  dorama_?: DoramaModel;
  fansub_?: FansubModel[];
  user_?: UserModel;
  attachment_?: AttachmentModel;
}

export interface EdictModel {
  id?: number;
  kanji?: string;
  reading?: string;
  meaning?: string;
  flags?: string;
  jlpt?: number;
  created_at?: number | Date;
  updated_at?: number | Date;
}

export interface HirakataModel {
  romaji?: string;
  hiragana?: string;
  katakana?: string;
  category?: string;
  segment?: string;
  created_at?: number | Date;
  updated_at?: number | Date;
}

export interface KanjiModel {
  character?: string;
  jlpt?: number;
  school?: number;
  stroke?: number;
  freq?: number;
  skip?: string;
  nelson_n?: string;
  nelson_c?: number;
  context?: number;
  harlpern_njecd?: number;
  harlpern_kkld?: number;
  gakken?: number;
  remember?: number;
  maniette?: number;
  v_onyomi?: string;
  v_kunyomi?: string;
  translate?: string;
  created_at?: number | Date;
  updated_at?: number | Date;
}

export interface KanjiVgModel {
  id?: number;
  kanji?: string;
  level?: string;
  path?: string;
  created_at?: number | Date;
  updated_at?: number | Date;
}

export interface KomentarModel {
  id?: number;
  comment?: string;
  path?: string;
  created_at?: number | Date;
  updated_at?: number | Date;
  parent_komentar_?: KomentarModel;
  user_?: UserModel;
  reply?: KomentarModel[];
  show_reply?: boolean;
  reply_count?: number;
  reply_page?: number;
  reply_page_finised?: boolean;
  reply_mode?: boolean;
  reply_to_send?: string;
}

export interface LessonModel {
  id?: number;
  title?: string;
  content?: string;
  image_url?: string;
  created_at?: number | Date;
  updated_at?: number | Date;
  attachment_?: AttachmentModel;
  user_?: UserModel;
  parent_lesson_?: LessonModel;
}

export interface NewsModel {
  id?: number;
  title?: string;
  content?: string;
  image_url?: string;
  tags?: string;
  view_count?: number;
  like_count?: number;
  created_at?: number | Date;
  updated_at?: number | Date;
  user_?: UserModel;
}

export interface LikeDislikeModel {
  id?: string;
  type?: LikeAndDislikeModel;
  created_at?: number | Date;
  updated_at?: number | Date;
  news_?: NewsModel;
  berkas_?: BerkasModel;
  fansub_?: FansubModel;
  user_?: UserModel;
  report_by_?: UserModel;
}

export interface NihongoModel {
  id?: number;
  romaji?: string;
  kana?: string;
  meaning?: string;
  category?: string;
  audio?: string;
  image_url?: string;
  created_at?: number | Date;
  updated_at?: number | Date;
  user_?: UserModel;
}

export interface NotificationModel {
  id?: number;
  type?: string;
  title?: string;
  content?: string;
  dismissible?: boolean;
  deadline?: Date;
  created_at?: number | Date;
  updated_at?: number | Date;
  user_?: UserModel;
}

export interface RegistrationModel {
  id?: string;
  username?: string;
  email?: string;
  password?: string;
  nama?: string;
  activation_token?: string;
  created_at?: number | Date;
  updated_at?: number | Date;
}

export interface SocialMediaModel {
  id?: string;
  refresh_token?: string;
  type?: SosMedModel;
  created_at?: number | Date;
  updated_at?: number | Date;
  user_?: UserModel;
}

export interface TatoebaModel {
  id?: number;
  phrase?: string;
  kanji?: string;
  flags?: string;
  translate?: string;
  created_at?: number | Date;
  updated_at?: number | Date;
}

export interface TempAttachmentModel {
  id?: string;
  name?: string;
  ext?: string;
  size?: number;
  download_count?: number;
  created_at?: number | Date;
  updated_at?: number | Date;
  user_?: UserModel;
}