import { AppState } from './app-state';
import { Action } from './todo.actions';
import { LoadTodosAction, 
		 DeleteTodoAction, 
		 AddTodoAction, 
		 EditTodoAction, 
		 ToggleTodoAction, 
		 SetSelectedTodoAction, 
		 UnsetSelectedTodoAction } from './todo.actions';
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

		console.log(state);
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

export function sortStateTodos(todos: Array<Todo>) {

	todos.sort((todo1, todo2) => {

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

	return todos;
}