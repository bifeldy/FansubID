const { contextBridge, ipcRenderer } = require('electron');

contextBridge.exposeInMainWorld('electron', {
  version: {
    electron: process.versions.electron,
    chrome: process.versions.chrome,
    node: process.versions.node
  },
  ipcRenderer: {
    send: (channel, data) => {
      ipcRenderer.send(channel, data);
    },
    sendSync: (channel, data) => {
      return ipcRenderer.sendSync(channel, data);
    },
    on: (channel, func) => {
      return ipcRenderer.on(channel, (event, ...args) => func(...args));
    }
  }
});
