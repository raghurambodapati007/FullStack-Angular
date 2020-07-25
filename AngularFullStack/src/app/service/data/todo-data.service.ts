import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Todo } from 'src/app/list-todos/list-todos.component';
import { API_URL,JPA_API_URL } from './../../app.constants';

@Injectable({
  providedIn: 'root'
})
export class TodoDataService {

  constructor(private http:HttpClient)  { }


  retrieveAllTodos(username) {
    //We are passing the expected return obj by creating HelloWorldBean class 
    return this.http.get<Todo[]>(`${JPA_API_URL}/users/${username}/todos`);
  }

  deleteTodo(username,id){
    return this.http.delete(`${JPA_API_URL}/users/${username}/todos/${id}`);
  }

  retrieveTodo(username,id){
    return this.http.get<Todo>(`${JPA_API_URL}/users/${username}/todos/${id}`);
  }

  updateTodo(username,id,todo){
    return this.http.put<Todo>(`${JPA_API_URL}/users/${username}/todos/${id}`,todo);
  }

  createTodo(username,todo){
    return this.http.post(`${JPA_API_URL}/users/${username}/todos/`,todo);
  }

}  
