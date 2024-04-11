/*
*  Protractor support is deprecated in Angular.
*  Protractor is used in this example for compatibility with Angular documentation tools.
*/
import { bootstrapApplication,provideProtractorTestingSupport } from '@angular/platform-browser';
import { provideRouter, withDebugTracing } from '@angular/router';
import { OAuthModule, provideOAuthClient } from "angular-oauth2-oidc";
import { provideHttpClient } from '@angular/common/http';
import { APP_ROUTES } from './app/app.routes';
import { AppComponent } from './app/app.component';
import { LoginComponent } from './app/login/login.component';
import { GoogleApiService } from './app/login/google-api.service';

bootstrapApplication(AppComponent,{
  providers: [
      provideProtractorTestingSupport(),
      provideRouter(APP_ROUTES, withDebugTracing()),
      provideHttpClient(),
      provideOAuthClient(),
    ]
  })
  .catch(err => console.error(err));

/*
Copyright Google LLC. All Rights Reserved.
Use of this source code is governed by an MIT-style license that
can be found in the LICENSE file at https://angular.io/license
*/