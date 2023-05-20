import { Injectable } from '@angular/core';
import { HttpRequest, HttpHandler, HttpEvent, HttpInterceptor, HttpResponse } from '@angular/common/http';
import { ActivatedRoute, Router } from '@angular/router';

import { catchError, tap } from 'rxjs/operators';
import { Observable, throwError } from 'rxjs';

import { GlobalService } from '../services/global.service';
import { AuthService } from '../services/auth.service';
import { BusyService } from '../services/busy.service';
import { StatsServerService } from '../services/stats-server.service';
import { LocalStorageService } from '../services/local-storage.service';
import { ToastService } from '../services/toast.service';

import { environment } from '../../../environments/app/environment';

@Injectable()
export class HttpResponseInterceptor implements HttpInterceptor {

  constructor(
    private gs: GlobalService,
    private router: Router,
    private as: AuthService,
    private toast: ToastService,
    private bs: BusyService,
    private ss: StatsServerService,
    private ls: LocalStorageService,
    private activatedRoute: ActivatedRoute
  ) {
    if (this.gs.isBrowser) {
      //
    }
  }

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    return next.handle(request).pipe(
      tap((res) => {
        if (res instanceof HttpResponse && this.gs.isBrowser) {
          let okMessage = 'UwUu~ Berhasil~';
          let okTitle = 'Yeay, Selesai!';
          if (res) {
            if ((res as any).body) {
              if ((res as any).body.info) {
                okTitle = (res as any).body.info;
              }
              if ((res as any).body.result) {
                if ((res as any).body.result.message) {
                  okMessage = (res as any).body.result.message;
                }
              }
            }
          }
          switch ((res as any).status) {
            case 200:
              this.toast.success(okMessage, okTitle);
              break;
            case 201:
            case 202:
              this.toast.info(okMessage, okTitle);
              break;
            default:
              this.toast.warning(okMessage, okTitle);
              break;
          }
          if (request.method === 'GET') {
            this.gs.log(`[SOCKET_TRACK-SET]`, request.url);
            let pathUrl = request.url;
            if (pathUrl.startsWith(environment.baseUrl)) {
              pathUrl = pathUrl.slice(environment.baseUrl.length);
            }
            if (pathUrl.startsWith(environment.apiUrl)) {
              pathUrl = pathUrl.slice(environment.apiUrl.length);
            }
            this.ss.socketEmitVolatile('track-set', { pathUrl: pathUrl.split('?')[0] });
          }
        }
      }),
      catchError(e => {
        this.gs.log(`[INTERCEPT_ERROR-${e.status}]`, e.statusText);
        if (this.gs.isBrowser) {
          let errorMessage = 'Terjadi Kesalahan Pada Jaringan~';
          let errorTitle = 'Whoops, Server Sibuk T.T';
          if (e) {
            if (e.error) {
              if (e.error.info) {
                errorTitle = e.error.info;
              }
              if (e.error.result) {
                if (e.error.result.message) {
                  errorMessage = e.error.result.message;
                }
              }
            }
          }
          this.toast.error(errorMessage, errorTitle, null, true);
          switch (e.status) {
            case 401:
              this.as.removeUser();
              this.ls.clear();
              this.bs.idle();
              this.router.navigate(['/login'], {
                queryParams: {
                  returnUrl: this.router.url || '/'
                }
              });
              break;
            case 404:
              this.bs.idle();
              this.router.navigate(['/error'], {
                queryParams: {
                  returnUrl: this.activatedRoute.snapshot.parent?.url || '/'
                }
              });
              break;
            case 418:
              this.bs.idle();
              this.router.navigate(['/verify'], {
                queryParams: {
                  returnUrl: this.router.url || '/'
                }
              });
              break;
            default:
              break;
          }
        }
        return throwError(() => e.error);
      }
    ));
  }

}
