// 3rd Party Library
import { stripHtml } from 'string-strip-html';

// NodeJS Library
import { unlink } from 'node:fs';

import { Injectable } from '@nestjs/common';

import { environment } from '../../environments/api/environment';

import { Seasons } from '../../app/_shared/models/Seasons';

@Injectable()
export class GlobalService {

  seasonal = [
    { id: 1, name: Seasons.WINTER }, { id: 2, name: Seasons.SPRING },
    { id: 3, name: Seasons.SUMMER }, { id: 4, name: Seasons.FALL }
  ];

  constructor(
    //
  ) {
    //
  }

  log(message: any, data: any = null, type: string = 'log'): void {
    if (!environment.production) {
      let logger = null;
      if (type === 'warn') {
        logger = console.warn;
      } else if (type === 'error') {
        logger = console.error;
      } else if (type === 'table') {
        logger = console.table;
      } else {
        logger = console.log;
      }
      if (data) {
        logger(message, data);
      } else {
        logger(message);
      }
    }
  }

  OBJ2XML(obj: object): string {
    var xml = '';
    for (var prop in obj) {
      xml += obj[prop] instanceof Array ? '' : '<' + prop + '>';
      if (obj[prop] instanceof Array) {
        for (var array in obj[prop]) {
          xml += '<' + prop + '>';
          xml += this.OBJ2XML(new Object(obj[prop][array]));
          xml += '</' + prop + '>';
        }
      } else if (typeof obj[prop] === 'object') {
        xml += this.OBJ2XML(new Object(obj[prop]));
      } else {
        xml += obj[prop];
      }
      xml += obj[prop] instanceof Array ? '' : '</' + prop + '>';
    }
    var xml = xml.replace(/<\/?[0-9]{1,}>/g, '');
    return `<root>${xml}</root>`;
  }

  htmlToText(htmlElementString: string): string {
    const stringText = stripHtml(htmlElementString);
    return stringText.result;
  }

  deleteAttachment(videoFileNameNoExt: string) {
    unlink(`${environment.uploadFolder}/${videoFileNameNoExt}`, (err) => {
      if (err) {
        this.log('[NODE_FS_UNLINK-ERROR] 🔗', err, 'error');
      }
    });
  }

}
