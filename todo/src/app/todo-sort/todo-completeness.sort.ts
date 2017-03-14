import { ITodoSort } from './todo-sort';
import { Todo } from '../todo';

export class TodoCompletenessSort implements ITodoSort {
	
	constructor() {
	}

	sort( todos: Array<Todo> ): Array<Todo> {

		return todos.sort((todo1, todo2) => {

			if(!todo1.isCompleted)
				return -1;
			else if(todo1.isCompleted && todo2.isCompleted)
				return 0;
			else	
				return 1;
		});
	}
}