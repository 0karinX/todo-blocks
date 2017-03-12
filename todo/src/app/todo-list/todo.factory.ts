import { Todo } from '../todo';

export class TodoFactory {

	create(_id: 			string = null,
			name: 			string,
			description: 	string,
			isCompleted: 	boolean = false,
			dateCreated: 	Date = new Date(),
			dateCompleted: 	Date,
			deadline: 		Date): Todo {

		console.log('Ola! from TodoFactory');

		let newTodo = new Todo(_id, 
								name, 
								description, 
								isCompleted,
								dateCreated,
								dateCompleted,
								deadline);

		return newTodo;

	}
}