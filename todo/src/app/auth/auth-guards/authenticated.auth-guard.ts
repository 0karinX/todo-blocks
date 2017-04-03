import { Injectable, Inject } from '@angular/core';
import { CanActivate } from '@angular/router';
import { IAuthService } from '../auth-strats/IAuthService';
import { AuthJWTService } from '../auth-strats/auth-jwt.service';
import { tokenNotExpired } from 'angular2-jwt';
import { authJWTService } from "../../di-tokens";
import { Router } from '@angular/router';


@Injectable()
export class AuthenticatedAuthGuard implements CanActivate {

  constructor(@Inject(authJWTService) private _authService: IAuthService) {}

  canActivate() {

  	console.log("ORAYT!");
  	console.log(this._authService.isAuthenticated())
    return this._authService.isAuthenticated();
  }
}