import { ITodoSort } from './todo-sort';
import { Todo } from '../todo';
import * as moment from 'moment';

export class TodoDeadlineSort implements ITodoSort {
	
	constructor() {
	}

	sort( todos: Array<Todo> ): Array<Todo> {

		return todos.sort((todo1, todo2) => {

			const momentTodo1 = todo1.deadline ? moment(todo1.deadline) : moment();
			const momentTodo2 = todo2.deadline ? moment(todo2.deadline) : moment();

			if(!momentTodo1 || !momentTodo2){
				console.log('missing sumting');
				return 1;
			}

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