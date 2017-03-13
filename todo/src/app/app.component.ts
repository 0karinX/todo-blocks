import { Component, Inject } from '@angular/core';
import { Observer } from "rxjs/Observer";
import { dispatcher } from "./di-tokens";
import { Action } from './app-state/todo.actions';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  
  constructor(@Inject(dispatcher) private _dispatcher: Observer<Action>) {

  }

  change(value: any) {
  	//this._dispatcher.next();
  }
}
