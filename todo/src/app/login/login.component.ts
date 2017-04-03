import { Component, Inject, OnInit } from '@angular/core';
import { Http, Response, Headers, RequestOptions} from '@angular/http';
import { authJWTService } from "../di-tokens";
import { Router } from '@angular/router';

import { LoginService } from './login.service';

@Component({
  selector: 'login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
	
	username: string;
	password: string;

	constructor(private _loginService: LoginService, private _router: Router) {}

	login( callback ): void {

		this._loginService.login(this.username, this.password, 

			(res) => { // on Success callback

				if( res.jwt) {
					localStorage.setItem('access_token', res.jwt);
					this._router.navigate(['todo']);
				}
			},
			(err) => { //on Fail callback
				// TODO
			});
	}

	logout(): void {

		this._loginService.logout(null);
	}
}
