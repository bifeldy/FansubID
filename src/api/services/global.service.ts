// 3rd Party Library
import { stripHtml } from 'string-strip-html';

// NodeJS Library
import { unlink } from 'node:fs';

import { Injectable } from '@nestjs/common';

import { environment } from '../../environments/api/environment';

import { SEASONS } from '../../models/seasons';

@Injectable()
export class GlobalService {

  seasonal = [
    { id: 1, name: SEASONS.WINTER }, { id: 2, name: SEASONS.SPRING },
    { id: 3, name: SEASONS.SUMMER }, { id: 4, name: SEASONS.FALL }
  ];

  constructor(
    //
  ) {
    //
  }

  log(message: any, data: any = null, type: string = 'log'): void {
    if (!environment.production || type === 'error') {
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
    if (htmlElementString) {
      const stringText = stripHtml(htmlElementString);
      return stringText.result;
    }
    return '';
  }

  // Only MKV Video Attachment Files Don't Have Any Extension -- Temporary Server Storage
  deleteAttachment(videoFileNameNoExt: string) {
    unlink(`${environment.uploadFolder}/${videoFileNameNoExt}`, (err) => {
      if (err) {
        this.log('[NODE_FS_UNLINK-ERROR] 🔗', err, 'error');
      }
    });
  }

  cleanIpOrigin(ipOrigin: string): string {
    ipOrigin = ipOrigin || '';
    // Remove Prefixes
    if (ipOrigin.startsWith('::ffff:')) {
      ipOrigin = ipOrigin.slice(7, ipOrigin.length);
    }
    if (ipOrigin.startsWith('http://')) {
      ipOrigin = ipOrigin.slice(7, ipOrigin.length);
    } else if (ipOrigin.startsWith('https://')) {
      ipOrigin = ipOrigin.slice(8, ipOrigin.length);
    }
    if (ipOrigin.startsWith('www.')) {
      ipOrigin = ipOrigin.slice(4, ipOrigin.length);
    }
    // Get Domain Or IP Maybe With Port Included And Remove Folder Path
    ipOrigin = ipOrigin.split('/')[0];
    // Remove Port
    let totalColon = 0;
    for (let i = 0; i < ipOrigin.length; i++) {
      if (ipOrigin[i] === ':') {
        totalColon++;
      }
      if (totalColon > 1) {
        break;
      }
    }
    if (totalColon === 1) {
      // IPv4
      ipOrigin = ipOrigin.split(':')[0];
    } else {
      // IPv6
      ipOrigin = ipOrigin.split(']')[0];
      if (ipOrigin.startsWith('[')) {
        ipOrigin = ipOrigin.slice(1, ipOrigin.length);
      }
    }
    return ipOrigin;
  }

  cleanUpUrlStringRecord(text: string): string {
    if (text.startsWith('http://')) {
      text = text.slice(7, text.length);
    } else if (text.startsWith('https://')) {
      text = text.slice(8, text.length);
    }
    if (text.startsWith('www.')) {
      text = text.slice(4, text.length);
    }
    return text;
  }

}
