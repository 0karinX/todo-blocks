import { AppState } from './app-state';
import { Action } from './todo.actions';
import { LoadTodosAction, 
		 DeleteTodoAction, 
		 AddTodoAction, 
		 EditTodoAction, 
		 ToggleTodoAction, 
		 SetSelectedTodoAction, 
		 UnsetSelectedTodoAction,
		 ChangeSortKeyAction } from './todo.actions';
import { Todo} from '../todo';
import * as moment from 'moment';
 
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

		return state;

	} else if( action instanceof ToggleTodoAction) {

		let index = state.findIndex((todo) => todo._id === action.toggleTodo._id);
		state[index].isCompleted = !action.toggleTodo.isCompleted;
		
		return (state);

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

export function reduceSortKey(state: string, action: Action): string {

	if( action instanceof ChangeSortKeyAction)
		return action.sortKey;
	else
		return state;
}