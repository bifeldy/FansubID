import { Inject, Injectable, Optional } from '@angular/core';
import { RESPONSE } from '@nestjs/ng-universal/dist/tokens';

import { Response } from 'express';

import { GlobalService } from './global.service';

@Injectable({
  providedIn: 'root'
})
export class ServerResponseService {

  // https://stackoverflow.com/questions/70926063/angular-9-ssr-404-not-found-page-with-status-code
  // https://github.com/DSpace/dspace-angular/commit/015b439a39208da4515eb4d18e4d21640fce1df0
  // https://medium.com/@pratheeshrussell/an-introduction-to-angular-server-side-rendering-ssr-with-nestjs-c121185d5824

  private response: Response;

  constructor(
    @Optional() @Inject(RESPONSE) res: Response,
    private gs: GlobalService
  ) {
    this.response = res;
  }

  setStatus(code: number, message?: string): this {
    if (!this.gs.isBrowser) {
      if (this.response) {
        this.response.status(code);
        this.response.statusCode = code;
        if (message) {
          this.response.statusMessage = message;
        }
      }
    }
    return this;
  }

  setNotFound(message = 'Not Found'): this {
    return this.setStatus(404, message)
  }

}