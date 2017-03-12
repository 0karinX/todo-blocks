import { AppState } from './app-state';
import { Action } from './todo.actions';
import { LoadTodosAction, DeleteTodoAction, AddTodoAction, EditTodoAction, ToggleTodoAction, SetSelectedTodoAction, UnsetSelectedTodoAction } from './todo.actions';
import { Todo} from '../todo';

 
export function reduceTodos( state: Todo[], action: Action): Todo[] {

	if( action instanceof LoadTodosAction) {
		return action.todos;

	} else if( action instanceof DeleteTodoAction) {

		let index = state.findIndex((todo) => todo._id === action.todo._id);
		state.splice(index, 1);

		return state;

	} else if( action instanceof AddTodoAction) {

		state.push( action.newTodo );
		return state;

	} else if( action instanceof EditTodoAction) {

		let index 		= state.findIndex((todo) => todo._id === action.modifiedTodo._id);
		state[index]	= action.modifiedTodo;

		console.log(state);
		return state;

	} else if( action instanceof ToggleTodoAction) {

		let index 		= state.findIndex((todo) => todo._id === action.toggleTodo._id);
		state[index].isCompleted = !action.toggleTodo.isCompleted;
		return sortStateTodos(state);

	}else
		return state;
}

export function reduceCurrentTodo( state: Todo, action: Action ): Todo {

	if( action instanceof SetSelectedTodoAction ) {
		return action.selectedTodo;

	} else if ( action instanceof UnsetSelectedTodoAction) {
		return null;
		
	} else
		return state;
}

function sortStateTodos(todos: Array<Todo>) {

	todos.sort((todo1, todo2) => {

		if(todo1.isCompleted && todo2.isCompleted){
			return 1;

		} else if(todo1.isCompleted && !todo2.isCompleted) {
			return 1;
		} else {
			return -1;
		}
	});

	return todos;
}