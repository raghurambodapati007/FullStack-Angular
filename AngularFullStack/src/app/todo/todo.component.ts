import { Component, OnInit } from '@angular/core';
import { TodoDataService } from '../service/data/todo-data.service';
import { Todo } from '../list-todos/list-todos.component';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-todo',
  templateUrl: './todo.component.html',
  styleUrls: ['./todo.component.css']
})
export class TodoComponent implements OnInit {

  id:number;
  todo:Todo;
  username:string;

  constructor(private todoService:TodoDataService,
              private route:ActivatedRoute,
              private router:Router) { }

  ngOnInit(): void {

    this.id=this.route.snapshot.params['id'];
    this.username=sessionStorage.getItem('authenticatedUser');

    /* We are adding this todo to fetch the id from URL and populate the appropriate details*/
    this.todo=new Todo(this.id,'',false,new Date());

    if(this.id !=-1){
      this.todoService.retrieveTodo(this.username,this.id).subscribe(

          response=> {this.todo = response;}

      )
    }
  }

  saveTodo(){
    if(this.id==-1){
      this.todoService.createTodo(this.username,this.todo)
      .subscribe(
        data => {
          console.log(data);
          this.router.navigate(['todos'])
        }
      )
    }else{
      this.todoService.updateTodo(this.username,this.id,this.todo).subscribe(
        response => {
          console.log(response);
          this.router.navigate(['todos'])
        }
      )
      }
  }

}
