import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

import { catchError, timeout, map, retry } from 'rxjs/operators';
import { Observable, throwError } from 'rxjs';

import { environment } from '../../../environments/environment';

import { GlobalService } from './global.service';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  constructor(
    private http: HttpClient,
    private gs: GlobalService,
  ) {
  }

  uploadFile(path: string, model = {}): Observable<any> {
    this.gs.log('[API_POST]', path);
    const options: any = {
      observe: 'events',
      reportProgress: true
    };
    let body = model;
    const headers = new HttpHeaders().append('Content-Type', 'multipart/form-data');
    Object.assign(options, { headers });
    body = this.prepareFormData(model);
    return this.http.post(path.startsWith('http') ? path : environment.apiUrl + path, body, options);
  }

  downloadFile(path: string): Observable<any> {
    this.gs.log('[API_DOWNLOAD]', path);
    return this.http.get(environment.apiUrl + path, {
      responseType: 'blob',
      observe: 'events',
      reportProgress: true
    });
  }

  getData(path: string, timedOut = 10000): Observable<any> {
    return this.http.get(path.startsWith('http') ? path : environment.apiUrl + path).pipe(
      catchError(err => throwError(err)),
      map(res => res), timeout(timedOut), retry(3)
    );
  }

  postData(path: string, model = {}, multipart = false, timedOut = 10000): Observable<any> {
    this.gs.log('[API_POST]', path);
    const options = {};
    let body = model;
    let timer = timedOut;
    if (multipart) {
      const headers = new HttpHeaders().append('Content-Type', 'multipart/form-data');
      Object.assign(options, { headers });
      body = this.prepareFormData(model);
      timer = 20000;
    }
    return this.http.post(path.startsWith('http') ? path : environment.apiUrl + path, body, options).pipe(
      catchError(err => throwError(err)),
      map(res => res), timeout(timer)
    );
  }

  putData(path: string, model = {}, multipart = false, timedOut = 10000): Observable<any> {
    this.gs.log('[API_PUT]', path);
    const options = {};
    let body = model;
    let timer = timedOut;
    if (multipart) {
      const headers = new HttpHeaders().append('Content-Type', 'multipart/form-data');
      Object.assign(options, { headers });
      body = this.prepareFormData(model);
      timer = 20000;
    }
    return this.http.put(path.startsWith('http') ? path : environment.apiUrl + path, body, options).pipe(
      catchError(err => throwError(err)),
      map(res => res), timeout(timer)
    );
  }

  deleteData(path: string, timedOut = 10000): Observable<any> {
    this.gs.log('[API_DEL]', path);
    return this.http.delete(path.startsWith('http') ? path : environment.apiUrl + path).pipe(
      catchError(err => throwError(err)),
      map(res => res), timeout(timedOut)
    );
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
