import { Injectable, Inject } 	from '@angular/core';
import { AuthJWTService } 		from '../auth/auth-strats/auth-jwt.service';
import { IAuthService } 		from '../auth/auth-strats/IAuthService';
import { authJWTService } 		from '../di-tokens';


@Injectable()
export class LoginService {

	constructor(@Inject(authJWTService) private _authService: IAuthService) {}

	login( username: string, password: string, onSuccessCallback, onFailCallback) {

		this._authService.login(username, password).subscribe(

			res => {
				
				if(onSuccessCallback)
					onSuccessCallback( res );

        	},
         	err => {

				if(onSuccessCallback)
					onFailCallback( err );
         	});
	}

	logout( callback ) {
		this._authService.logout();
	}
}