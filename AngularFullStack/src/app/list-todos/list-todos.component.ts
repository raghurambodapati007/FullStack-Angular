import { Component, OnInit } from '@angular/core';
import {TodoDataService} from '../service/data/todo-data.service';
import { Router } from '@angular/router';


export class Todo {

  constructor(public id: number, public description: string, public done: boolean, public targetDate: Date) {
  }
}


@Component({
  selector: 'app-list-todos',
  templateUrl: './list-todos.component.html',
  styleUrls: ['./list-todos.component.css']
})
export class ListTodosComponent implements OnInit {

  todos : Todo[];

  message:string;
  username:string;

  //  [
  //   new Todo(1, 'Learn to code Angular', false, new Date()),
  //   new Todo(2, 'Learn to code Spring framework', false, new Date()),
  //   new Todo(3, 'Learn to code Spring Boot 2.2.2', false, new Date())
  // ]


  constructor(private todoService:TodoDataService,private router:Router) { }

  ngOnInit(): void {
    this.username=sessionStorage.getItem('authenticatedUser');
     this.refreshTodos();
  }

  refreshTodos(){

    this.todoService.retrieveAllTodos(this.username).subscribe(
      response => { this.todos = response; },
      error => {console.log('error occured')}
    )
  }

  deleteTodo(id){
    console.log(`delete todo ${id}`)
    this.todoService.deleteTodo(this.username,id).subscribe(
      response =>{ 
        console.log(response);
        this.message=`Delete of ${id} successful`;
        this.refreshTodos();
       }
    )
  }

  updateTodo(id){
    this.router.navigate(['todos',id]);
  }

  addTodo(){
    this.router.navigate(['todos',-1]);
  }


}
