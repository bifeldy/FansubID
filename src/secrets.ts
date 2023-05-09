// NodeJS Library
import { readFileSync } from 'node:fs';

interface SECRETS_DATA_TYPE {
  IS_PRODUCTION: boolean;
  JWT_SECRET_KEY: string;
  DOMAIN: string;
  DOMAIN_ALT: string;
  IP: string;
  BASE_URL: string;
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
  MAL_CLIENT_ID: string;
};

let SECRETS_DATA: SECRETS_DATA_TYPE = null;

export function SECRETS() {
  if (!SECRETS_DATA) {
    try {
      const jsonFile = readFileSync('secret.json', 'utf8');
      SECRETS_DATA = JSON.parse(jsonFile);
    } catch (e) {
      console.error('[NODE_FS_READ_FILE_SYNC-ERROR] 📖', e);
      process.exit(1);
    }
  }
  return SECRETS_DATA;
}
