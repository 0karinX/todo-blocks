import { Todo } from '../todo';

export interface AppState {

	todos: Todo[];
	currentlySelectedTodo: Todo;
}