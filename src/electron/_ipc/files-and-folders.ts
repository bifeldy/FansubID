import fs from 'fs';
import path from 'path';

import { IpcMainEvent } from 'electron';

import { isRoot } from '../config';

import { DataFileFolder } from '../models/DataFileFolder';

const defaultDataFileFolder: DataFileFolder = {
  folderPath: '',
  ext: ['apng', 'bmp', 'gif', 'jpg', 'jpeg', 'png', 'svg', 'webp']
};

export function getFolders(event: IpcMainEvent, data = defaultDataFileFolder) {
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

export function getFiles(event: IpcMainEvent, data = defaultDataFileFolder) {
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
