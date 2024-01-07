import { CallHandler, ExecutionContext, Injectable, NestInterceptor } from '@nestjs/common';
import { map, Observable } from 'rxjs';
import { classToPlain } from 'class-transformer';

import { GlobalService } from '../services/global.service';

@Injectable()
export class ExcludeFieldInterceptor implements NestInterceptor {

  constructor(
    private gs: GlobalService
  ) {
    //
  }

  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    return next.handle().pipe(
      map(data => {
        this.gs.log(`[TRANSFORM_INTERCEPTOR] 💥`, data);
        return classToPlain(data);
      })
    );
  }

}
