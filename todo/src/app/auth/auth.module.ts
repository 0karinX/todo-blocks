import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Http, RequestOptions } from '@angular/http';
import { AuthHttp, AuthConfig } from 'angular2-jwt';
import { AuthJWTService } from './auth-strats/auth-jwt.service';
import { authJWTService } from "../di-tokens";


const authServerURL = 'http://localhost:3000/auth/login';

function authHttpServiceFactory(http: Http, options: RequestOptions) {
  return new AuthHttp(new AuthConfig(), http, options);
}

export function authJWTServiceFactory( http: Http ) {
  return new AuthJWTService(http, authServerURL);
}

@NgModule({
  imports: [
    CommonModule
  ],
  exports: [
  ],
  declarations: [
  ],
  providers: [
  	{
      provide: AuthHttp,
      useFactory: authHttpServiceFactory,
      deps: [Http, RequestOptions]
    },
    {
      provide: authJWTService,
      useFactory: authJWTServiceFactory,
      deps: [Http]
    },
  ]
})
export class AuthModule { }
