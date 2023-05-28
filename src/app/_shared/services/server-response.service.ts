import { RESPONSE } from '@nguniversal/express-engine/tokens';
import { Inject, Injectable, Optional } from '@angular/core';
import { Response } from 'express';

@Injectable({
  providedIn: 'root'
})
export class ServerResponseService {

  // https://stackoverflow.com/questions/70926063/angular-9-ssr-404-not-found-page-with-status-code
  // https://github.com/DSpace/dspace-angular/commit/015b439a39208da4515eb4d18e4d21640fce1df0

  private response: Response;

  constructor(
    @Optional() @Inject(RESPONSE) res: Response
  ) {
    this.response = res;
  }

  setStatus(code: number, message?: string): this {
    if (this.response) {
      this.response.statusCode = code;
      if (message) {
        this.response.statusMessage = message;
      }
    }
    return this;
  }

  setNotFound(message = 'Not Found'): this {
    return this.setStatus(404, message)
  }

}