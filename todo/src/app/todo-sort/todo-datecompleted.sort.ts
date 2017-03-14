import { ITodoSort } from './todo-sort';
import { Todo } from '../todo';
import * as moment from 'moment';

export class TodoDateCompletedSort implements ITodoSort {
	
	constructor() {
	}

	sort( todos: Array<Todo> ): Array<Todo> {

		return todos.sort((todo1, todo2) => {

			const momentTodo1 = moment(todo1.dateCompleted);
			const momentTodo2 = moment(todo2.dateCompleted);

			if(momentTodo1.isAfter(momentTodo2)){
				return 1;
			}
			else if(momentTodo2.isAfter(momentTodo1)){
				return -1;
			}
			else
				return 0;
		});
	}
}