import { bootstrapApplication } from '@angular/platform-browser';
import { AppComponent } from './app/app.component';
import { provideRouter } from '@angular/router';
import { HttpClient, provideHttpClient, withInterceptors } from '@angular/common/http';
import { routes } from './app/app.routes';
import { provideAnimations } from '@angular/platform-browser/animations';
import { StartupService } from './app/services/startup.service';


bootstrapApplication(AppComponent, {
  providers:
    [provideRouter(routes), provideHttpClient(), provideAnimations()]
})
  /*.then(appRef => {
    const injector = appRef.injector;
    const startupService = injector.get(StartupService);
    startupService.showMessage();
  })*/
  .catch((err) => console.error(err));
