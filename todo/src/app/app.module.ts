import { BrowserModule } from '@angular/platform-browser';
import { NgModule, Inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { AlertModule } from 'ng2-bootstrap';
import {BehaviorSubject} from 'rxjs/BehaviorSubject.js';

import { AppComponent } from './app.component';
import { TodoListComponent } from './todo-list/todo-list.component';
import { TodoListItemComponent } from './todo-list/todo-list-item/todo-list-item.component';
import { dispatcher, state, initialState, todoSorter } from "./di-tokens";
import { Action } from './app-state/todo.actions';
import { LoadTodosAction } from './app-state/todo.actions'
import { applicationStateFactory } from './app-state/app-state.factory';
import { TodoFormModalComponent } from './todo-list/todo-form-modal/todo-form-modal.component';
import { TodoFormFillerDirective } from './todo-list/todo-form-modal/todo-form-filler.directive';
import { TodoFactory } from './todo-list/todo.factory';
import { Todo } from './todo';
import { TodoSyncStatusComponent } from './todo-list/todo-sync-status/todo-sync-status.component';

import { TodoSorter } from './todo-sort/todo-sorter';
import { TodoDeadlineSort } from  './todo-sort/todo-deadline.sort';
import { TodoDateCreatedSort } from  './todo-sort/todo-datecreated.sort';
import { TodoDateCompletedSort } from  './todo-sort/todo-datecompleted.sort';
import { TodoCompletenessSort } from  './todo-sort/todo-completeness.sort';
import { TodoSortingComponent } from './todo-list/todo-sorting/todo-sorting.component';
import { KeysPipe } from './shared/keys.pipe';


export function behaviorSubjectFactory() {
    return new BehaviorSubject<Action>(new LoadTodosAction([]));
}

export function todoSorterFactory( _todoDeadlineSort:       TodoDeadlineSort,  
                                   _todoDateCreatedSort :   TodoDateCreatedSort,
                                   _todoCompletenessSort:   TodoCompletenessSort,
                                   _todoDateCompletedSort: TodoDateCompletedSort) {
    return new TodoSorter( _todoDeadlineSort, _todoDateCreatedSort, _todoCompletenessSort, _todoDateCompletedSort);
}

@NgModule({
  declarations: [
    AppComponent,
    TodoListComponent,
    TodoListItemComponent,
    TodoFormModalComponent,
    TodoFormFillerDirective,
    TodoSyncStatusComponent,
    TodoSortingComponent,
    KeysPipe
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    AlertModule.forRoot()
  ],
  providers: [
    TodoFactory,
    TodoDeadlineSort,
    TodoDateCreatedSort,
    TodoCompletenessSort,
    { provide: todoSorter, 
      useFactory: todoSorterFactory, 
      deps: [ TodoDeadlineSort, TodoDateCreatedSort, TodoCompletenessSort ]},
    { provide: initialState, 
      useValue: {
                  todos: [], 
                  currentlySelectedTodo: null,
                  todoSortKey: 'dateCreated'
                } 
    },
    { provide: dispatcher, useFactory: behaviorSubjectFactory},
    { 
      provide:       state, 
      useFactory:    applicationStateFactory, 
      deps:          [ initialState, dispatcher, todoSorter]
    }

  ],
  bootstrap: [
    AppComponent
  ]
})
export class AppModule { }
