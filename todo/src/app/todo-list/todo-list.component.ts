import { Component, OnInit, Inject } from '@angular/core';
import { TodoListService } from './todo-list.service';
import { Todo } from '../todo';
import { dispatcher, state, initialState } from "../di-tokens";
import { Action } from '../app-state/todo.actions';
import { LoadTodosAction, DeleteTodoAction, AddTodoAction, EditTodoAction, ToggleTodoAction, SetSelectedTodoAction, UnsetSelectedTodoAction, ChangeSortKeyAction } from '../app-state/todo.actions';
import { AppState } from '../app-state/app-state';
import { Observer } from "rxjs/Observer";
import { Observable } from "rxjs/Observable";
import { TodoFormModalComponent } from './todo-form-modal/todo-form-modal.component';

@Component({
  selector: 'todo-list',
  templateUrl: './todo-list.component.html',
  styleUrls: ['./todo-list.component.css'],
  providers: [ TodoListService ]
})
export class TodoListComponent implements OnInit {

  constructor(private _todoListService: TodoListService, 
              @Inject(dispatcher) private _dispatcher: Observer<Action>,
              @Inject(state) private _state: Observable<AppState>) { }

  ngOnInit() {
      this.loadInitialTodos();
  }

  loadInitialTodos(): void {

       this._todoListService.getTodos().subscribe( 
         res => {
             this._dispatcher.next(new LoadTodosAction(res));
         },
         err => {}
    );
  }

  delete(todoToDelete: Todo): void {

    //this._dispatcher.next( new DeleteTodoAction(todoToDelete) );
    this._todoListService.deleteTodo(todoToDelete).subscribe(
        res => {
            this._dispatcher.next( new DeleteTodoAction(todoToDelete) );
        },
        err => {}
     );
  }

  todoFormHandler( todo: Todo ): void {
      
      //if the todo passed contains no _id, we will create it on the server.. if _id is existing.. do the edit procedure.
      if( !todo._id ){
          console.log('no id, create');
          this.add(todo);
      } else {
          console.log('id found, edit');
          this.edit(todo);
      }
  }

  add( newTodo: Todo ): void {

      this._todoListService.addTodo( newTodo ).subscribe(

        res => {
          this._dispatcher.next( new AddTodoAction( <Todo>res ));
        },
        err => {

        }
      )
  }

  switchToEditMode( modifiedTodo: Todo ): void {

      this._dispatcher.next( new SetSelectedTodoAction( modifiedTodo ));
  }

  edit( modifiedTodo: Todo ) {

    this._todoListService.editTodo( modifiedTodo ).subscribe(

        res => {
          this._dispatcher.next( new EditTodoAction( modifiedTodo ));
        },
        err => {}
      );
  }

  toggle( todo: Todo): void {

    todo.isCompleted   = !todo.isCompleted;
    todo.dateCompleted = todo.isCompleted ? new Date() : undefined; // undefined is mongoose instead of null;

    this._todoListService.editTodo( todo ).subscribe(

        res => {
          this._dispatcher.next( new EditTodoAction( todo ));
        },
        err => {}
    );
  }

  changeSortKey(value: string): void {
    this._dispatcher.next( new ChangeSortKeyAction(value));
  }

  modalCancel() {
    this._dispatcher.next( new UnsetSelectedTodoAction());
  }

  get todos() {
    return this._state.map( (state: AppState) => (<Todo[]> state.todos));
  }
}
