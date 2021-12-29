const { ipcMain } = require('electron');

const { getFolders, getFiles } = require('./controllers/files-and-folders');
const { initialize, getAllQueue, getDetail, downloadFiles, uploadFiles, removeAll, removeTorrent, pauseTorrent, resumeTorrent } = require('./controllers/torrent');

function handleIpc() {
  ipcMain.on('list-folders', getFolders);
  ipcMain.on('list-files-in-folder', getFiles);
  ipcMain.on('torrent-client-init', initialize);
  ipcMain.on('torrent-client-all-queue', getAllQueue);
  ipcMain.on('torrent-file-detail', getDetail);
  ipcMain.on('torrent-file-download', downloadFiles);
  ipcMain.on('torrent-file-upload', uploadFiles);
  ipcMain.on('torrent-file-remove', removeTorrent);
  ipcMain.on('torrent-file-pause', pauseTorrent);
  ipcMain.on('torrent-file-resume', resumeTorrent);
  ipcMain.on('torrent-file-remove-all', removeAll);
}

module.exports = {
  handleIpc
};