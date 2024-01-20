// 3rd Party Library
import S3 from 'aws-sdk/clients/s3';

// NodeJS Library
import { createReadStream } from 'node:fs';
import { PassThrough } from 'node:stream';
import { URL } from 'node:url';

import { Injectable } from '@nestjs/common';

import { CONSTANTS } from '../../constants';

import { environment } from '../../environments/api/environment';

import { UserModel } from '../../models/req-res.model';

import { GlobalService } from './global.service';

@Injectable()
export class AmazonWebService {

  constructor(
    private gs: GlobalService
  ) {
    //
  }

  s3(): S3 {
    return new S3({
      endpoint: `https://${environment.s3Compatible.endpoint}`,
      accessKeyId: environment.s3Compatible.accessKeyId,
      secretAccessKey: environment.s3Compatible.secretAccessKey,
    });
  }

  async getDdl(fileName: string, user: UserModel, expiredSeconds = CONSTANTS.timeDdlS3): Promise<URL> {
    if (fileName.startsWith('http://')) {
      fileName = fileName.slice(7, fileName.length);
    } else if (fileName.startsWith('https://')) {
      fileName = fileName.slice(8, fileName.length);
    }
    const directLink1 = `${environment.s3Compatible.endpoint}/`;
    if (fileName.startsWith(directLink1)) {
      fileName = fileName.slice(directLink1.length, fileName.length);
    }
    const directLink2 = `${environment.s3Compatible.bucket}/`;
    if (fileName.startsWith(directLink2)) {
      fileName = fileName.slice(directLink2.length, fileName.length);
    }
    const ddl = await this.s3().getSignedUrlPromise('getObject', {
      Bucket: environment.s3Compatible.bucket,
      Key: fileName,
      Expires: expiredSeconds
    });
    const uri = new URL(ddl);
    const url = new URL(`https://${environment.s3Compatible.bucket}/${fileName}`);
    const sp = ['AWSAccessKeyId', 'Expires', 'Signature'];
    for (const q of sp) {
      url.searchParams.append(q, uri.searchParams.get(q));
    }
    url.searchParams.append('ngsw-bypass', 'true');
    this.gs.log('[AWS_S3] ⛅', url);
    return url;
  }

  async uploadDdl(fullFileName: string): Promise<S3.ManagedUpload.SendData> {
    const passThrough = new PassThrough();
    const upload = this.s3().upload({
      Bucket: environment.s3Compatible.bucket,
      Key: fullFileName,
      Body: passThrough
    }).promise();
    const readStream = createReadStream(`${environment.uploadFolder}/${fullFileName}`);
    readStream.pipe(passThrough);
    const ddl = await upload;
    this.gs.log('[AWS_S3] ⛅', ddl);
    return ddl;
  }

}
