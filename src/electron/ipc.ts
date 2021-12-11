import { ipcMain } from 'electron';

import { getFolders, getFiles } from './controllers/files-and-folders';
import { initialize } from './controllers/torrent';

export function handleIpc(): void {
  ipcMain.on('list-folders', getFolders);
  ipcMain.on('list-files-in-folder', getFiles);
  ipcMain.on('torrent-client-init', initialize);
}
