import { Directive, HostListener, Inject, ElementRef, AfterViewInit, ViewChild } from '@angular/core';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { AppState } from '../../app-state/app-state';
import { state } from '../../di-tokens';
import { Todo } from '../../todo';
import * as moment from 'moment';

@Directive({
  selector: '[todoModal]'
})
export class TodoFormFillerDirective implements AfterViewInit {

  private _thisNativeElement: any;

  constructor( private _elementRef : ElementRef, 
  			   @Inject(state) private _appState: BehaviorSubject<AppState> ) {}

  ngAfterViewInit() {

    this._thisNativeElement = this._elementRef.nativeElement;

    $(this._elementRef.nativeElement).on('show.bs.modal', () => {
      this.populateFormFields();
    });
  }

  getCurrentSelectedTodo(): Todo {
  	return this._appState.getValue().currentlySelectedTodo;
  }

  populateFormFields(): void {

  	const currentTodo 		  = this._appState.getValue().currentlySelectedTodo;
    const todoTitleField    = (<HTMLInputElement> document.getElementById('todo-title'));
    const todoIdField       = (<HTMLInputElement> document.getElementById('todo-id'));
    const todoDeadline      = (<HTMLInputElement> document.getElementById('todo-deadline')); 
    const todoDateCreated   = (<HTMLInputElement> document.getElementById('todo-date-created'));
  	const descriptionField 	= (<HTMLInputElement> document.getElementById('todo-description'));
    const modalButton       = (<HTMLButtonElement> document.getElementById('todo-ok-button'));
    const modalTitle        = (<HTMLTitleElement> document.getElementById('todo-modal-title'));
    const form              = (<HTMLFormElement> document.getElementById('todo-form'));

  	currentTodo ? this.todoEditMode(currentTodo, 
                                    todoIdField, 
                                    todoDateCreated,
                                    todoDeadline,
                                    descriptionField, 
                                    todoTitleField, 
                                    modalButton, 
                                    modalTitle) : this.todoAddMode(form,todoIdField, todoDateCreated, modalButton, modalTitle);

  }
  
  todoEditMode(currentTodo:         Todo, 
               todoIdField:         HTMLInputElement, 
               todoDateCreated:     HTMLInputElement, 
               todoDeadline:        HTMLInputElement,
               descriptionElement:  HTMLInputElement, 
               todoTitleField:      HTMLInputElement, 
               modalButton:         HTMLButtonElement, 
               modalTitle:          HTMLTitleElement) {

     
      todoIdField.value          = currentTodo._id;
      todoDateCreated.value      = currentTodo.dateCreated.toString();
      todoDeadline.value         = currentTodo.deadline && moment(currentTodo.deadline).format('YYYY-MM-DD');

      descriptionElement.value   = currentTodo.description;
      todoTitleField.value       = currentTodo.name;
      modalTitle.innerHTML       = 'Edit Todo ' + currentTodo.description;
      modalButton.innerHTML      = 'Save';
  
  }

   todoAddMode(form: HTMLFormElement, todoIdField: HTMLInputElement, todoDateCreatedField: HTMLInputElement, modalButton: HTMLButtonElement, modalTitle: HTMLTitleElement) {

      form.reset();
      todoDateCreatedField.value = '';
      todoIdField.value          = ''; // form.reset() does not reset hidden fields;
      modalTitle.innerHTML       = 'Create New Todo';
      modalButton.innerHTML      = 'Create';
  }
}
