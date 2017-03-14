import { Injectable, Inject } from '@angular/core';
import { Todo } from '../todo';
import { ITodoSort } from  './todo-sort';
import { TodoDeadlineSort } from  './todo-deadline.sort';
import { TodoDateCreatedSort } from  './todo-datecreated.sort';
import { TodoCompletenessSort } from  './todo-completeness.sort';
import { TodoDateCompletedSort } from  './todo-datecompleted.sort';


@Injectable()
export class TodoSorter {

	sortAlgoMap = {};

	constructor( private _todoDeadlineSort: 		TodoDeadlineSort, 
				 private _todoDateCreatedSort: 		TodoDateCreatedSort,
				 private _todoCompletenessSort: 	TodoCompletenessSort,
				 private _todoDateCompletedSort: 	TodoDateCompletedSort
				 ) {

		this.sortAlgoMap = {
			"deadline": 	_todoDeadlineSort,
			"dateCreated":	_todoDateCreatedSort,
			"isCompleted":  _todoCompletenessSort,
			"dateCompleted": _todoDateCompletedSort
		}
	}

	sortTodos(sortKey: string, todos: Array<Todo>): Array<Todo> {

		const sortAlg: ITodoSort = this.sortAlgoMap[sortKey];

		if(!sortAlg)
			return todos;

		return sortAlg.sort(todos);
	}
}