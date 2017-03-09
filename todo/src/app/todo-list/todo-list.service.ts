import { Injectable } from '@angular/core';
import { Http, Response, Headers, RequestOptions} from '@angular/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/do';
import 'rxjs/add/operator/catch';

import { Todo } from '../todo';

@Injectable()
export class TodoListService {

	private TODOS_URL: string = "http://localhost:3000/todos";

	constructor(private _http: Http) { }

	getTodos(): Observable<Todo[]> {

		return this._http.get(this.TODOS_URL)
				.map((response: Response) => <Todo[]> response.json())
				.do(data => console.log('All: ' + JSON.stringify(data)))
				.catch(this.handleError);
	}

	deleteTodo(todo: Todo): Observable<Todo> {

		const url = this.TODOS_URL + "/" + todo._id;

		return this._http.delete(url)				
				.map((response: Response) => response.json())
				.catch(this.handleError);
	}

	addTodo( todo: Todo ): Observable<Todo> {

		let headers = new Headers({ 'Content-Type': 'application/json' });
    	let options = new RequestOptions({ headers: headers });

		return this._http.post(this.TODOS_URL, { 'todo': todo }, options)
					.map(((response: Response) => response.json()))
					.catch(this.handleError);
	}

	editTodo( todo: Todo ): Observable<Todo> {

		let headers = new Headers({ 'Content-Type': 'application/json' });
    	let options = new RequestOptions({ headers: headers });

		return this._http.put(this.TODOS_URL, { 'todo': todo }, options)
					.map(((response: Response) => response.json()))
					.do(data => console.log(data))
					.catch(this.handleError);
	}

	private handleError(error: Response) {
		console.error(error);
		return Observable.throw(error.json().error || 'server error');
	}
}
