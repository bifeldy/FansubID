const { isProduction } = require('../config');

function log(text, data = null, forcePrint = false) {
  if (!isProduction()) {
    forcePrint = true;
  }
  if (forcePrint) {
    if (data) {
      console.log(text, data);
    } else {
      console.log(text);
    }
  }
}

module.exports = {
  log
};