import { Component, Input, Output, EventEmitter, ViewChild, ElementRef } from '@angular/core';
import { Todo } from '../../todo';

@Component({
  selector: 'todo-list-item',
  templateUrl: './todo-list-item.component.html',
  styleUrls: ['./todo-list-item.component.css']
})
export class TodoListItemComponent {

  @ViewChild('editButton') 
  editButton: ElementRef;

  @Input()
  todo: Todo;

  @Output()
  deleteClicked:  EventEmitter<any> = new EventEmitter<any>();

  @Output()
  editClicked:    EventEmitter<any> = new EventEmitter<any>();

  @Output()
  toggleClicked:  EventEmitter<any> = new EventEmitter<any>();

  constructor() { }

  deleteClickHandler(): void {
  	this.deleteClicked.emit( this.todo );
  }

  editClickHandler(): void {
    this.editClicked.emit( this.todo );
  }

  toggleClickHandler(): void {
    this.toggleClicked.emit( this.todo );
  }
}
