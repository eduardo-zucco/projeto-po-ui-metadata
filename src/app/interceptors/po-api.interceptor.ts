import { HttpInterceptorFn } from '@angular/common/http';
import { HttpRequest, HttpHandlerFn, HttpEvent, HttpResponse } from '@angular/common/http';
import { Observable, map } from 'rxjs';

export const poApiInterceptor: HttpInterceptorFn = (
  req: HttpRequest<any>,
  next: HttpHandlerFn
): Observable<HttpEvent<any>> => {
  const isUserApi = req.url.startsWith('/api/usercompletos') && !req.url.includes('/by-email');

  return next(req).pipe(
    map(event => {
      if (event instanceof HttpResponse && isUserApi) {
        const originalBody = event.body;

        if (originalBody && typeof originalBody === 'object' && originalBody !== null && 'items' in originalBody && 'hasNext' in originalBody) {
          return event;
        }

        const adaptedBody = {
          items: Array.isArray(originalBody) ? originalBody : [],
          hasNext: false
        };

        return event.clone({ body: adaptedBody });
      }


      return event;
    })
  );
};
