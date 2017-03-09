import { Observable } from 'rxjs/Observable';
import { BehaviorSubject } from 'rxjs/BehaviorSubject.js';
import 'rxjs/add/operator/scan';
import 'rxjs/add/operator/share';

import { AppState } from './app-state';
import { Action } from './todo.actions'
import { Todo } from '../todo';
import { reduceTodos, reduceCurrentTodo } from './app-state.reducer';

function wrapIntoBehaviorSubject(init, obs) {

    const res = new BehaviorSubject(init);
    
    obs.subscribe(s => res.next(s));
    return res;
}

export function applicationStateFactory( state: AppState, action: Observable<Action>): Observable<AppState> {

	let appStateObservable = action.scan( (oldState: AppState, action) => {

		let newState: AppState = {
			todos: 					reduceTodos(oldState.todos, action),
			currentlySelectedTodo:	reduceCurrentTodo(oldState.currentlySelectedTodo, action)
		};

		return newState;

	}, state).share();

 	return wrapIntoBehaviorSubject(state, appStateObservable);
}