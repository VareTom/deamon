import { HttpErrorResponse, HttpInterceptorFn } from '@angular/common/http'
import { catchError } from 'rxjs'
import * as Sentry from "@sentry/angular";


export const httpErrorInterceptor: HttpInterceptorFn = (request, next) => {
  return next(request).pipe(
    catchError((error) => {
      if (error instanceof HttpErrorResponse) {
        switch (error.status) {

          case 404:
          case 400:
          case 405:
          case 500:
            Sentry.captureException(error);
            break
        }
      }
      return next(request)
    })
  )
}
