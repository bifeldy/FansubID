import { ValueTransformer } from 'typeorm';

import { environment } from '../../environments/api/environment';

export class IpoChanTransformer implements ValueTransformer {

  private includesOneOf(text: string, arr: string[]): boolean {
    for (const a of arr) {
      if (text?.includes(a)) {
        return true;
      }
    }
    return false;
  }

  // Used to marshal data when writing to the database.
  to(data: string): string {
    return data
  }

  // Used to unmarshal data when reading from the database.
  from(data: string): string {
    let imgUrl = data;
    if (imgUrl?.startsWith('http') && this.includesOneOf(imgUrl, environment.ipoChanProxyUrl)) {
      imgUrl = `https://crawl.${environment.domain}/?url=${encodeURIComponent(imgUrl)}`;
    }
    return imgUrl;
  }

}