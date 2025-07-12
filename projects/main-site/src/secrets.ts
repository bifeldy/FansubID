// NodeJS Library
import { readFileSync } from 'node:fs';

interface SECRETS_DATA_TYPE {
  IS_PRODUCTION: boolean;
  JWT_SECRET_KEY: string;
  DOMAIN: string;
  DOMAIN_ALT: string;
  IP: string;
  BASE_URL: string;
  DB_HOST: string;
  DB_PORT: number;
  DB_USERNAME: string;
  DB_PASSWORD: string;
  RECAPTCHA_SECRET_KEY: string;
  API_PEMERINTAH_KTP_URL: string;
  API_PEMERINTAH_KTP_SECRET_KEY: string;
  IMGBB_KEY: string;
  GCP_APP_CLIENT_SECRET: string;
  GCP_PERSONAL_ACCOUNT_CLIENT_ID: string;
  GCP_PERSONAL_ACCOUNT_CLIENT_SECRET: string;
  GCP_PERSONAL_ACCOUNT_CLIENT_EMAIL: string;
  GCP_PERSONAL_ACCOUNT_REFRESH_TOKEN: string;
  GCP_SERVICE_ACCOUNT_PRIVATE_KEY_ID: string;
  GCP_SERVICE_ACCOUNT_PRIVATE_KEY: string;
  GCP_SERVICE_ACCOUNT_CLIENT_EMAIL: string;
  GCP_SERVICE_ACCOUNT_CLIENT_ID: string;
  GCP_SERVICE_ACCOUNT_CLIENT_X509_CERT_URL: string;
  MAILTRAP_KEY: string;
  CLOUDFLARE_KEY: string;
  DISCORD_CLIENT_SECRET: string;
  DISCORD_BOT_LOGIN_TOKEN: string;
  LINE_CLIENT_SECRET: string;
  LINE_BOT_LOGIN_TOKEN: string;
  MAL_CLIENT_ID: string;
  ID_CLOUD_HOST_API_KEY: string;
  S3_BUCKET: string;
  S3_ENDPOINT: string;
  S3_ACCESS_KEY_ID: string;
  S3_SECRET_ACCESS_KEY: string;
  R2_BUCKET: string;
  R2_ENDPOINT: string;
  R2_API_TOKEN: string;
  R2_ACCESS_KEY_ID: string;
  R2_SECRET_ACCESS_KEY: string;
  TELEGRAM_BOT_TOKEN: string;
};

let SECRETS_DATA: SECRETS_DATA_TYPE = null;

export function SECRETS() {
  if (!SECRETS_DATA) {
    try {
      const jsonFile = readFileSync('projects/main-site/secret.json', 'utf8');
      SECRETS_DATA = JSON.parse(jsonFile);
    } catch (e) {
      console.error('[NODE_FS_READ_FILE_SYNC-ERROR] 📖', e);
      process.exit(1);
    }
  }
  return SECRETS_DATA;
}
