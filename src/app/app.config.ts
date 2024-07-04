import { APP_INITIALIZER, ApplicationConfig, ErrorHandler, provideZoneChangeDetection } from '@angular/core'
import { provideRouter, Router } from '@angular/router'
import * as Sentry from "@sentry/angular";
import { routes } from './app.routes';
import { httpErrorInterceptor } from './interceptors/http-error.interceptor'
import { provideHttpClient, withInterceptors } from '@angular/common/http'

export const appConfig: ApplicationConfig = {
  providers: [
    provideZoneChangeDetection({ eventCoalescing: true }),
    provideRouter(routes),
    provideHttpClient(
      withInterceptors([httpErrorInterceptor])
    ),
    {
      provide: ErrorHandler,
      useValue: Sentry.createErrorHandler({
        showDialog: true,
      }),
    }, {
      provide: Sentry.TraceService,
      deps: [Router],
    },
    {
      provide: APP_INITIALIZER,
      useFactory: () => () => {},
      deps: [Sentry.TraceService],
      multi: true,
    },
  ],

};
