import { Injectable, Inject } from '@angular/core';
import { Todo } from '../todo';
import { TodoDeadlineSort } from  './todo-deadline.sort';
import {  TodoDateCreatedSort } from  './todo-datecreated.sort';

@Injectable()
export class TodoSorter {

	constructor( private _todoDeadlineSort: TodoDeadlineSort, 
				 private _todDateCreatedSort: TodoDateCreatedSort) {

	}

	sortTodos(sortKey: String, todos: Array<Todo>): Array<Todo> {

		switch (sortKey) {

			case "deadline":
				console.log('KONGKOYLAH!');
				this._todoDeadlineSort.sort(todos);
				break;

			case "dateCreated":
				console.log('dateCreated!');
				this._todDateCreatedSort.sort(todos);
				break;
			
			default:
				// code...
				break;
		}
		return todos;
	}
}