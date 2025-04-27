import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'bytes'
})
export class BytesPipe implements PipeTransform {

  transform(bytes: number, decimals = 2): string {
    if (!+bytes) {
      return '0 Byte';
    }
    const k = 1024;
    const dm = decimals < 0 ? 0 : decimals;
    const unit = ['B', 'KB', 'MB', 'GB', 'TB', 'PB', 'EB', 'ZB', 'YB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    const value = parseFloat((bytes / Math.pow(k, i)).toFixed(dm));
    return `${value} ${unit[i] || '??'}`;
  }

}
