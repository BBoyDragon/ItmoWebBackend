import { Injectable } from '@nestjs/common';
import { CallHandler, ExecutionContext, NestInterceptor } from '@nestjs/common';
import { Observable } from 'rxjs';
import { createHash } from 'crypto';
import { tap } from 'rxjs/operators';

@Injectable()
export class ETagInterceptor implements NestInterceptor {
  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    return next.handle().pipe(
      tap((data) => {
        const etag = createHash('md5')
          .update(JSON.stringify(data))
          .digest('hex');

        const response = context.switchToHttp().getResponse();
        response.setHeader('ETag', etag);
        response.setHeader('Cache-Control', 'public, max-age=3600');
      }),
    );
  }
}
