import { Component, EventEmitter, Output, Inject } from '@angular/core';
import { TodoSorter } from '../../todo-sort/todo-sorter';
import { todoSorter } from "../../di-tokens";


@Component({
  selector: 'todo-sorting-dropdown',
  templateUrl: './todo-sorting.component.html',
  styleUrls: ['./todo-sorting.component.css']
})
export class TodoSortingComponent {

	@Output()
	sortKeyChanged: EventEmitter<any> = new EventEmitter<any>();

	allowedSorts: {};

	constructor(@Inject(todoSorter) private _todoSorter: TodoSorter) {
		this.allowedSorts = _todoSorter.sortAlgoMap;
	}

	changeHandler(value: any): void {
		this.sortKeyChanged.emit(value);
	}
}
