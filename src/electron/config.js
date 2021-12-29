const path = require('path');

let config = {
  production: true,
  mainWindow: null
};

function setMainWin(win) {
  config.mainWindow = win;
}

function getMainWin() {
  return config.mainWindow;
}

function isProduction() {
  return config.production;
}

function isRoot() {
  return path.parse(process.cwd()).root == process.cwd();
}

module.exports = {
  setMainWin,
  getMainWin,
  isProduction,
  isRoot
};