import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

import { timeout, retry } from 'rxjs/operators';
import { Observable } from 'rxjs';

import { environment } from '../../../environments/app/environment';

import { GlobalService } from './global.service';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  constructor(
    private http: HttpClient,
    private gs: GlobalService
  ) {
    if (this.gs.isBrowser) {
      //
    }
  }

  HTTP_REQ_URL(path: string): string {
    if (path.startsWith('/')) {
      let reqUrl = environment.baseUrl;
      if (!path.startsWith('/api/')) {
        reqUrl += environment.apiUrl;
      }
      path = reqUrl + path;
    }
    return path;
  }

  getData(path: string, options = {}, timedOut = 20 * 1000, retryCount = 3): Observable<any> {
    this.gs.log('[API_GET]', path);
    this.prepareOptions(options);
    return this.http.get(this.HTTP_REQ_URL(path), options).pipe(
      timeout(timedOut),
      retry(retryCount)
    );
  }

  postData(path: string, model = {}, multipart = false, options = {}, timedOut = 30 * 1000): Observable<any> {
    this.gs.log('[API_POST]', path);
    let body = model;
    if (multipart) {
      body = this.prepareFormData(model);
    }
    this.prepareOptions(options);
    return this.http.post(this.HTTP_REQ_URL(path), body, options).pipe(
      timeout(timedOut)
    );
  }

  putData(path: string, model = {}, multipart = false, options = {}, timedOut = 30 * 1000): Observable<any> {
    this.gs.log('[API_PUT]', path);
    let body = model;
    if (multipart) {
      body = this.prepareFormData(model);
    }
    this.prepareOptions(options);
    return this.http.put(this.HTTP_REQ_URL(path), body, options).pipe(
      timeout(timedOut)
    );
  }

  patchData(path: string, model = {}, multipart = false, options = {}, timedOut = 30 * 1000): Observable<any> {
    this.gs.log('[API_PATCH]', path);
    let body = model;
    if (multipart) {
      body = this.prepareFormData(model);
    }
    this.prepareOptions(options);
    return this.http.patch(this.HTTP_REQ_URL(path), body, options).pipe(
      timeout(timedOut)
    );
  }

  deleteData(path: string, options = {}, timedOut = 20 * 1000, retryCount = 3): Observable<any> {
    this.gs.log('[API_DELETE]', path);
    this.prepareOptions(options);
    return this.http.delete(this.HTTP_REQ_URL(path), options).pipe(
      timeout(timedOut),
      retry(retryCount)
    );
  }

  private prepareOptions(options: any): void {
    if (!(options.headers instanceof HttpHeaders)) {
      options.headers = new HttpHeaders(options.headers);
    }
  }

  private prepareFormData(data: any): FormData {
    const formData = new FormData();
    for (const key in data) {
      if (data.hasOwnProperty(key)) {
        formData.append(key, data[key]);
      }
    }
    return formData;
  }

}
