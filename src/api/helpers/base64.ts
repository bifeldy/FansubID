import { Buffer } from 'node:buffer';

export const universalBtoa = str => {
  return ConvertToBase64(str);
};

export const universalAtob = b64Encoded => {
  return ConvertFromBase64(b64Encoded);
};

export const ConvertToBase64 = str => {
  return Buffer.from(str).toString('base64');
};

export const ConvertFromBase64 = b64Encoded => {
  return Buffer.from(b64Encoded, 'base64').toString();
};
