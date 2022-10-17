import { CallHandler, ExecutionContext, Injectable, NestInterceptor } from '@nestjs/common';
import { map, Observable, tap } from "rxjs";

@Injectable()
export class InterceptorInterceptor implements NestInterceptor {
  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    const response = context.switchToHttp().getResponse();
    const start = new Date();
    // response.json({message: 'intercepted by interceptor'});
    // return response;
    return next.handle().pipe(
      tap(response => {
        console.log(`Duration ... ${new Date().getMilliseconds() - start.getMilliseconds()} ms`);
      }),
      map(response => (/*{'data' : response}*/ response))
    );
  }
}
