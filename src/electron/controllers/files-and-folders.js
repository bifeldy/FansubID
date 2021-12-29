const fs = require('fs');
const path = require('path');

const { IpcMainEvent } = require('electron');

const { isRoot } = require('../config');

const defaultDataFileFolder = {
  folderPath: 'user_data',
  ext: ['apng', 'bmp', 'gif', 'jpg', 'jpeg', 'png', 'svg', 'webp']
};

function getFolders(event, data = defaultDataFileFolder) {
  const fullPath = path.join(process.cwd(), data.folderPath);
  fs.readdir(fullPath, { withFileTypes: true }, (err, files) => {
    if (!err) {
      const directories = files
        .filter(file => file.isDirectory())
        .map(file => file.name);
      if (!isRoot()) {
        directories.unshift('..');
      }
      event.sender.send('list-folders', directories);
    }
  });
}

function getFiles(event, data = defaultDataFileFolder) {
  const fullPath = path.join(process.cwd(), data.folderPath);
  fs.readdir(fullPath, { withFileTypes: true }, (err, files) => {
    if (!err) {
      const re = /(?:\.([^.]+))?$/;
      const images = files
        .filter(file => file.isFile() && data.ext.includes(re.exec(file.name)[1]))
        .map(file => `file://${data.folderPath}/${file.name}`);
      event.sender.send('list-files-in-folder', images);
    }
  });
}

module.exports = {
  getFolders,
  getFiles
};