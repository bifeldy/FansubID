import { Injectable } from '@nestjs/common';

import { environment } from '../../environments/api/environment';

@Injectable()
export class GlobalService {

  constructor(
    //
  ) {
    //
  }

  log(message: any, data: any = null, type: string = 'log'): void {
    if (!environment.production) {
      if (type === 'log') {
        if (data != null) {
          console.log(message, data);
        } else {
          console.log(message);
        }
      } else if (type === 'warn') {
        console.warn(message, data);
      } else if (type === 'error') {
        console.error(message, data);
      } else if (type === 'table') {
        console.table(message);
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
      } else if (typeof obj[prop] == 'object') {
        xml += this.OBJ2XML(new Object(obj[prop]));
      } else {
        xml += obj[prop];
      }
      xml += obj[prop] instanceof Array ? '' : '</' + prop + '>';
    }
    var xml = xml.replace(/<\/?[0-9]{1,}>/g, '');
    return `<root>${xml}</root>`;
  }

}
