import { Component, OnInit, EventEmitter, Output, ViewChild, ElementRef } from '@angular/core';
import { TodoFactory } from '../todo.factory';
import * as moment from 'moment';

@Component({
  selector: 'todo-form-modal',
  templateUrl: './todo-form-modal.component.html',
  styleUrls: ['./todo-form-modal.component.css']
})
export class TodoFormModalComponent {

	@Output()
	editSaveClicked: EventEmitter<any> = new EventEmitter<any>();

	@Output()
	createClicked: 	 EventEmitter<any> = new EventEmitter<any>();

	@Output()
	closeClicked: 	 EventEmitter<any> = new EventEmitter<any>();

	@ViewChild('todoDescription')
	_description: ElementRef;

	@ViewChild('todoTitle')
	_todoTitle: ElementRef;

	@ViewChild('todoDeadline')
	_todoDeadline: ElementRef;


	@ViewChild('todoId')
	_todoId: ElementRef;

	@ViewChild('todoDateCreated')
	_todoDateCreated: ElementRef;

	constructor(private _todoFactory: TodoFactory) {}

	okClickHandler(): void {

		console.log('XXX');
		console.log(this._todoDeadline.nativeElement.value);

		this.createClicked.emit(
									this._todoFactory.create(
											this._todoId.nativeElement.value,
											this._todoTitle.nativeElement.value,
											this._description.nativeElement.value,
											false,
											this._todoDateCreated.nativeElement.value,
											null,
											this._todoDeadline.nativeElement.value
										)	
								);
	}

	modalCloseClickHandler(): void {
		this.closeClicked.emit();
	}
}
