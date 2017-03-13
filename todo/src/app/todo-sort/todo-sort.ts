import { Todo } from '../todo';

export interface ITodoSort {

	sort( todos: Array<Todo> ): Array<Todo>
}