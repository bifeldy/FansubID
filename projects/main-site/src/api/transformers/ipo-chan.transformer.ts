import { ValueTransformer } from 'typeorm';

import { environment } from '../../environments/api/environment';

export class IpoChanTransformer implements ValueTransformer {

  // Used to marshal data when writing to the database.
  to(data: string): string {
    return data
  }

  // Used to unmarshal data when reading from the database.
  from(data: string): string {
    let imgUrl = data;
    if (imgUrl?.startsWith('http') && !imgUrl?.includes(environment.s3Compatible.bucket)) {
      imgUrl = `https://crawl.${environment.domain}/?url=${encodeURIComponent(imgUrl)}`;
    }
    return imgUrl;
  }

}