import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouteReuseStrategy } from '@angular/router';
import { JwtModule } from '@auth0/angular-jwt';
import { AuthInterceptorService } from '@core/interceptor/authInterceptor';
import { ErrorInterceptor } from '@core/interceptor/error.interceptor';
import { ModalComponent } from '@shared/components/modal/modal.component';
import { AppRoutingModule } from './app-routing.module';

import { AppComponent } from './app.component';
import { CustomRouterReuseStrategy } from './custom-router-reuse.strategy';

export function tokenGetter(): any {
  return localStorage.getItem('token');
}

@NgModule({
  declarations: [AppComponent],
  imports: [BrowserModule, HttpClientModule, AppRoutingModule, ModalComponent,
    JwtModule.forRoot({
      config: {
        tokenGetter,
      },
    }),],
  providers: [
    {
      provide: RouteReuseStrategy,
      useClass: CustomRouterReuseStrategy,
    },
    { provide: HTTP_INTERCEPTORS, useClass: ErrorInterceptor, multi: true },
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AuthInterceptorService,
      multi: true,
    },
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
