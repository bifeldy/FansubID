const { app, BrowserWindow, shell } = require('electron');

const { getMainWin, setMainWin } = require('./config');
const { handleIpc } = require('./ipc');

let websiteUrl = 'http://localhost:4000';
let customProtocol = 'hikki://';

function handleMainWindow() {
  getMainWin().on('closed', () => {
    setMainWin(null);
  });
}

function setupMainWindow() {
  setMainWin(new BrowserWindow({
    width: 1280,
    height: 720,
    webPreferences: {
      preload: `${__dirname}/preload.js`
    }
  }));
  getMainWin().loadURL(websiteUrl);
  getMainWin().setMenu(null);
  getMainWin().webContents.openDevTools();
  getMainWin().webContents.setWindowOpenHandler(({ url }) => {
    if (url.startsWith(customProtocol)) {
      return {
        action: 'allow'
      };
    } else {
      shell.openExternal(url);
      return {
        action: 'deny'
      };
    }
  });
  handleMainWindow();
  handleIpc();
}

app.on('ready', setupMainWindow);

app.on('activate', () => {
  if (BrowserWindow.getAllWindows().length === 0) {
    setupMainWindow();
  }
});

// Quit when all windows are closed.
// On macOS it is common for applications and their menu bar
// to stay active until the user quits explicitly with Cmd + Q
app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit()
  }
});
