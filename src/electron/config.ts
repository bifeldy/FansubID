import path from 'path';

import { BrowserWindow } from 'electron';

let config = {
  mainWindow: null,
};

export function setMainWin(win: BrowserWindow) {
  config.mainWindow = win;
}

export function getMainWin(): BrowserWindow {
  return config.mainWindow;
}

export function isRoot() {
  return path.parse(process.cwd()).root == process.cwd();
}
