// 3rd Party Library
import S3 from 'aws-sdk/clients/s3';

// NodeJS Library
import { Buffer } from 'node:buffer';
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
      secretAccessKey: environment.s3Compatible.secretAccessKey
    });
  }

  cleanUrl(originalUrl: string): string {
    let urlFile = originalUrl;
    if (urlFile.startsWith('http://')) {
      urlFile = urlFile.slice(7, urlFile.length);
    } else if (urlFile.startsWith('https://')) {
      urlFile = urlFile.slice(8, urlFile.length);
    }
    const directLink1 = `${environment.s3Compatible.endpoint}/`;
    if (urlFile.startsWith(directLink1)) {
      urlFile = urlFile.slice(directLink1.length, urlFile.length);
    }
    return urlFile;
  }

  async getDdl(fileName: string, user: UserModel, expiredSeconds = CONSTANTS.timeDdlS3, customFileName = null, customMimeType = null): Promise<URL> {
    fileName = this.cleanUrl(fileName);
    const bucketName = fileName.split('/')[0];
    const directLink2 = `${environment.s3Compatible.bucket}/`;
    if (fileName.startsWith(directLink2)) {
      fileName = fileName.slice(directLink2.length, fileName.length);
    }
    const optParam: any = {
      Bucket: bucketName,
      Key: fileName,
      Expires: expiredSeconds
    };
    if (customFileName) {
      optParam.ResponseContentDisposition = `attachment; filename ="${customFileName}"`;
    }
    if (customMimeType) {
      optParam.ResponseContentType = customMimeType;
    }
    const ddl = await this.s3().getSignedUrlPromise('getObject', optParam);
    const uri = new URL(ddl);
    const url = new URL(`https://${bucketName}/${fileName}`);
    const sp = ['AWSAccessKeyId', 'Expires', 'Signature'];
    for (const q of sp) {
      url.searchParams.append(q, uri.searchParams.get(q));
    }
    url.searchParams.append('ngsw-bypass', 'true');
    this.gs.log('[AWS_S3_DDL_DOWN] ⛅', url);
    return url;
  }

  async uploadDdl(userId: number, fileName: string): Promise<S3.ManagedUpload.SendData> {
    const passThrough = new PassThrough();
    const upload = this.s3().upload({
      Bucket: environment.s3Compatible.bucket,
      Key: `u${userId}/ddl/${fileName}`,
      Body: passThrough
    }).promise();
    const readStream = createReadStream(`${environment.uploadFolder}/${fileName}`);
    readStream.pipe(passThrough);
    const ddl = await upload;
    ddl.Location = this.cleanUrl(ddl.Location);
    this.gs.log('[AWS_S3_DDL_UP] ⛅', ddl);
    return ddl;
  }

  async uploadImage(userId: number, imgb64: string, mime: string): Promise<S3.ManagedUpload.SendData> {
    var buf = Buffer.from(imgb64.replace(/^data:image\/\w+;base64,/, ''),'base64');
    const dateTime = Date.now().toString();
    const upload = this.s3().upload({
      Bucket: environment.s3Compatible.bucket,
      Key: `u${userId}/img/${dateTime}`,
      Body: buf,
      ACL: 'public-read',
      ContentEncoding: 'base64',
      ContentType: mime
    }).promise();
    const img = await upload;
    img.Location = this.cleanUrl(img.Location);
    this.gs.log('[AWS_S3_IMG_UP] ⛅', img);
    return img;
  }

}
