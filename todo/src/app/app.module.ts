import { BrowserModule } from '@angular/platform-browser';
import { NgModule, Inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { RouterModule, Routes } from '@angular/router';
import { LoginModule } from './login/login.module';

import { LoginComponent } from './login/login.component';
import { LoginService } from './login/login.service';
import { AuthJWTService } from './auth/auth-strats/auth-jwt.service';
import { IAuthService } from './auth/auth-strats/IAuthService';
import { AuthenticatedAuthGuard } from './auth/auth-guards/authenticated.auth-guard';
import { BehaviorSubject } from 'rxjs/BehaviorSubject.js';
import { AppComponent } from './app.component';
import { TodoListComponent } from './todo-list/todo-list.component';
import { TodoListItemComponent } from './todo-list/todo-list-item/todo-list-item.component';
import { dispatcher, state, initialState, todoSorter, authJWTService } from "./di-tokens";
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

import { Http } from '@angular/http'; 

const authServerURL = 'http://localhost:3000/auth/login';

export function behaviorSubjectFactory() {
    return new BehaviorSubject<Action>(new LoadTodosAction([]));
}

export function todoSorterFactory( _todoDeadlineSort:       TodoDeadlineSort,  
                                   _todoDateCreatedSort :   TodoDateCreatedSort,
                                   _todoCompletenessSort:   TodoCompletenessSort,
                                   _todoDateCompletedSort: TodoDateCompletedSort) {
    return new TodoSorter( _todoDeadlineSort, _todoDateCreatedSort, _todoCompletenessSort, _todoDateCompletedSort);
}

export function authJWTServiceFactory( http: Http ) {
  return new AuthJWTService(http, authServerURL);
}

export function authenticatedAuthGuardFactory(authService: IAuthService) {
    return new AuthenticatedAuthGuard(authService);
}


const appRoutes: Routes = [
  { 
      path: 'todo',   
      component: TodoListComponent,
      canActivate: ['AuthenticatedAuthGuard']

  },
  { 
      path: 'login',   
      component: LoginComponent,
  },
  { 
    path: '',
    redirectTo: 'login',
    pathMatch: 'full'
  }
];

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
    LoginModule,
    RouterModule.forRoot(appRoutes)
  ],
  providers: [
    AuthJWTService,
    LoginService,
    TodoFactory,
    TodoDeadlineSort,
    TodoDateCreatedSort,
    TodoCompletenessSort,
    {
      provide: authJWTService,
      useFactory: authJWTServiceFactory,
      deps: [Http]
    },
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
    },
    { 
      provide:       'AuthenticatedAuthGuard', 
      useFactory:    authenticatedAuthGuardFactory, 
      deps:          [ authJWTService ]
    }
  ],
  bootstrap: [
    AppComponent
  ]
})
export class AppModule { }
