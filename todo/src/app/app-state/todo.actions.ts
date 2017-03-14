import { Todo } from '../todo';

export class LoadTodosAction {

    constructor(public todos: Todo[]) {

    }
}

export class DeleteTodoAction {

    constructor(public todo: Todo) {}
}

export class AddTodoAction {

    constructor(public newTodo: Todo) {}
}

export class EditTodoAction {

    constructor(public modifiedTodo: Todo) {}
}

export class ToggleTodoAction {

    constructor(public toggleTodo: Todo) {}
}

export class SetSelectedTodoAction {

    constructor(public selectedTodo: Todo) {}
}

export class UnsetSelectedTodoAction {}

export class ChangeSortKeyAction {

	constructor( public sortKey: string){}
}

export type Action = LoadTodosAction | DeleteTodoAction | AddTodoAction | EditTodoAction | ToggleTodoAction |SetSelectedTodoAction | UnsetSelectedTodoAction | ChangeSortKeyAction;
