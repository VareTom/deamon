import { bootstrapApplication } from '@angular/platform-browser';
import { appConfig } from './app/app.config';
import { AppComponent } from './app/app.component';
import * as Sentry from "@sentry/angular";

Sentry.init({
  dsn: "https://1d783022f5983710c0e9a92b1a741d76@o1243325.ingest.us.sentry.io/4507545023217664",
  integrations: [],
});

bootstrapApplication(AppComponent, appConfig)
  .catch((err) => console.error(err));
