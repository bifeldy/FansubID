import { contextBridge, ipcRenderer } from 'electron';

contextBridge.exposeInMainWorld('electron', {
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
