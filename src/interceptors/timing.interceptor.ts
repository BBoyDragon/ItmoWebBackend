import { Injectable } from '@nestjs/common';
import { CallHandler, ExecutionContext, NestInterceptor } from '@nestjs/common';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';

@Injectable()
export class TimingInterceptor implements NestInterceptor {
  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    const now = Date.now();

    return next
      .handle()
      .pipe(
        tap(() => {
          const elapsedTime = Date.now() - now;
          console.log(`Request processed in ${elapsedTime}ms`);

          const response = context.switchToHttp().getResponse();
          response.setHeader('X-Elapsed-Time', `${elapsedTime}ms`);
        }),
      );
  }
}
