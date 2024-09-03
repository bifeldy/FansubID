// 3rd Party Library
import { stripHtml } from 'string-strip-html';

// NodeJS Library
import { unlink } from 'node:fs';

import { Injectable } from '@nestjs/common';

import { environment } from '../../environments/api/environment';

import { SEASONS } from '../../models/seasons';
import { CONSTANTS } from '../../constants';

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

  htmlToText(htmlElementString: string): string {
    if (htmlElementString) {
      const stringText = stripHtml(htmlElementString);
      return stringText.result;
    }
    return '';
  }

  // Only MKV Video Attachment Files Don't Have Any Extension -- Temporary Server Storage
  deleteAttachment(fullFileName: string) {
    unlink(`${environment.uploadFolder}/${fullFileName}`, (err) => {
      if (err) {
        this.log('[NODE_FS_UNLINK-ERROR] 🔗', err, 'error');
      }
    });
  }

  cleanIpOrigin(ipOrigin: string): string {
    if (ipOrigin) {
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
    return '';
  }

  cleanUpUrlStringRecord(text: string): string {
    if (text) {
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
    return '';
  }

  isFreeTime(st: string = null, et: string = null): boolean {
    const currentDate = new Date();
    const startTime = st || CONSTANTS.freeTimeStart;
    const endTime = et || CONSTANTS.freeTimeEnd;
    const stArr: number[] = startTime.split(":").map(n => Number(n));
    const etArr: number[] = endTime.split(":").map(n => Number(n));
    const startDate = new Date(currentDate.getTime());
    startDate.setHours(stArr[0]);
    startDate.setMinutes(stArr[1]);
    startDate.setSeconds(stArr[2]);
    if (etArr[0] < stArr[0]) {
      currentDate.setDate(currentDate.getDate() + 1);
    }
    const endDate = new Date(currentDate.getTime());
    endDate.setHours(etArr[0]);
    endDate.setMinutes(etArr[1]);
    endDate.setSeconds(etArr[2]);
    return startDate < currentDate && endDate > currentDate;
  }

  matchRule(str: string, rule: string) {
    // For this solution to work on any string, no matter what characters it has
    const escapeRegex = (str) => str.replace(/([.*+?^=!:${}()|\[\]\/\\])/g, "\\$1");
    // "."  => Find a single character, except newline or line terminator
    // ".*" => Matches any string that contains zero or more characters
    rule = rule.split("*").map(escapeRegex).join(".*");
    // "^"  => Matches any string with the following at the beginning of it
    // "$"  => Matches any string with that in front at the end of it
    rule = "^" + rule + "$"
    // Create a regular expression object for matching string
    const regex = new RegExp(rule);
    // Returns true if it finds a match, otherwise it returns false
    return regex.test(str);
  }

  matchRuleOneOf(text: string, arrText: string[]): boolean {
    for (const a of arrText) {
      if (this.matchRule(text, a)) {
        return true;
      }
    }
    return false;
  }

}
