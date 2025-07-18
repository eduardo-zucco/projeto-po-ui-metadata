import { provideRouter } from '@angular/router';

import { routes } from './app.routes';

import { APP_INITIALIZER, ApplicationConfig, importProvidersFrom, provideZoneChangeDetection } from '@angular/core';
import { provideHttpClient, withInterceptorsFromDi } from '@angular/common/http';

import { PoHttpRequestModule } from '@po-ui/ng-components';
import { StartupService } from './services/startup.service';

export const appConfig: ApplicationConfig = {
  providers: [
    provideRouter(routes),
    provideHttpClient(),
    importProvidersFrom([PoHttpRequestModule]),
    provideZoneChangeDetection({ eventCoalescing: true }),
    provideHttpClient(withInterceptorsFromDi()),
    /*{
      provide: APP_INITIALIZER,
      useFactory: (startupService: StartupService) => () => startupService.showMessage(),
      deps: [StartupService],
      multi: true
    }*/
  ],

};
