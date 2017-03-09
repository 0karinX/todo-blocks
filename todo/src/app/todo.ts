export class Todo {
	constructor( public _id: 			string, 
				 public name: 			string,
				 public description: 	string, 
				 public isCompleted: 	boolean = false,
				 public dateCreated: 	Date,
				 public dateCompleted:	Date,
				 public deadline: 		Date) {}
}