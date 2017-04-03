import { Injectable } from '@angular/core';
import { Http, Response, Headers, RequestOptions} from '@angular/http';

import { IAuthService } from './IAuthService';
import { Observable } from 'rxjs/Observable';
import { tokenNotExpired } from 'angular2-jwt';

@Injectable()
export class AuthJWTService implements IAuthService {

	constructor(private _http: Http, private _authServerURL: string) { }

	login(username: string, password: string): Observable<any> {
		console.log(" AuthJWTService - Login ");

		let headers = new Headers({ 'Content-Type': 'application/json' });
    	let options = new RequestOptions({ headers: headers });

		return this._http.post(this._authServerURL, { 'user': {'username': username, 'password': password} }, options)
						 .map((response: Response) => response.json());
	}

	logout(): void {
		console.log(" AuthJWTService - Logout ");
		localStorage.removeItem('access_token');
	}

	isAuthenticated(): boolean {
		console.log(" AuthJWTService - Authn ");

	  return tokenNotExpired(null, localStorage.getItem('access_token'));
	}
}

