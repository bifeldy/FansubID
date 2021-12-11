import { Injectable } from '@angular/core';
import { HttpRequest, HttpHandler, HttpEvent, HttpInterceptor, HttpResponse } from '@angular/common/http';
import { Router } from '@angular/router';

import { catchError, tap } from 'rxjs/operators';
import { Observable, throwError } from 'rxjs';
import { ToastrService } from 'ngx-toastr';

import { GlobalService } from '../services/global.service';
import { AuthService } from '../services/auth.service';
import { BusyService } from '../services/busy.service';
import { StatsServerService } from '../services/stats-server.service';
import { LocalStorageService } from '../services/local-storage.service';

import { environment } from '../../../environments/client/environment';

@Injectable()
export class HttpErrorInterceptor implements HttpInterceptor {

  currentUser = null;

  constructor(
    private gs: GlobalService,
    private router: Router,
    private as: AuthService,
    private toast: ToastrService,
    private bs: BusyService,
    private ss: StatsServerService,
    private ls: LocalStorageService
  ) {
    if (this.gs.isBrowser) {
      //
    }
  }

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {

    if (this.gs.isBrowser) {
      this.as.currentUser.subscribe({ next: user => this.currentUser = user });
    }

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
          if ((res as any).status === 202) {
            this.toast.info(okMessage, okTitle);
          } else if ((res as any).status === 200) {
            this.toast.success(okMessage, okTitle);
          } else {
            this.toast.warning(okMessage, okTitle);
          }
          if (request.method === 'GET') {
            this.gs.log(`[SOCKET_TRACK-SET]`, request.url);
            this.ss.socketEmitVolatile('track-set', {
              pathUrl: request.url.startsWith(environment.apiUrl) ? request.url.slice(environment.apiUrl.length) : request.url
            });
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
          this.toast.error(errorMessage, errorTitle);
        }
        if (e.status === 401) {
          this.as.removeUser();
          this.ls.clear();
          this.bs.idle();
          this.router.navigate(['/login'], {
            queryParams: {
              returnUrl: this.router.url
            }
          });
        }
        return throwError(() => e);
      }
    ));
  }

}
