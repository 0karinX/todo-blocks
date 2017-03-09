import { Component, OnInit, EventEmitter, Output, ViewChild, ElementRef } from '@angular/core';

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
	description: ElementRef;

	@ViewChild('todoTitle')
	todoTitle: ElementRef;

	@ViewChild('todoDeadline')
	todoDeadline: ElementRef;


	@ViewChild('todoId')
	todoId: ElementRef;

	okClickHandler(): void {
		this.createClicked.emit({	
									_id:			this.todoId.nativeElement.value,
									description: 	this.description.nativeElement.value,
									name: 			this.todoTitle.nativeElement.value,
									deadline:		this.todoDeadline.nativeElement.value
								});
	}

	modalCloseClickHandler(): void {
		this.closeClicked.emit();
	}
}
