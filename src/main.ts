import { bootstrapApplication } from '@angular/platform-browser';
import { AppComponent } from './app/app.component';
import { provideRouter } from '@angular/router';
import { HTTP_INTERCEPTORS, HttpClient, provideHttpClient, withInterceptors } from '@angular/common/http';
import { routes } from './app/app.routes';
import { provideAnimations } from '@angular/platform-browser/animations';
import { StartupService } from './app/services/startup.service';
import { TokenInterceptor } from './app/token-interceptor';
import { jwtInterceptor } from './app/services/jwt-interceptor.service';




bootstrapApplication(AppComponent, {
  providers:
    [provideRouter(routes), provideHttpClient(withInterceptors([jwtInterceptor])), provideAnimations()]
})
  .catch((err) => console.error(err));
