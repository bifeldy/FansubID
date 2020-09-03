export const universalBtoa = str => {
  try {
    return btoa(str);
  } catch (err) {
    console.error(err);
    return Buffer.from(str).toString('base64');
  }
};

export const universalAtob = b64Encoded => {
  try {
    return atob(b64Encoded);
  } catch (err) {
    console.error(err);
    return Buffer.from(b64Encoded, 'base64').toString();
  }
};
