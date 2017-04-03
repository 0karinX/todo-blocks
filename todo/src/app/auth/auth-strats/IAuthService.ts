export interface IAuthService {

	login(username: string, password: string): any;
	isAuthenticated(): any;
	logout(): any;
}