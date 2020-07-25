package com.infy.AngularFullStack.AngularFullStack.todoResourceController;

import java.util.ArrayList;
import java.util.Date;
import java.util.List;

import org.springframework.stereotype.Service;

import com.infy.AngularFullStack.AngularFullStack.todo.Todo;

@Service
public class TodoHardCodedService {

	private static List<Todo> todos = new ArrayList<>();
	private static long counter = 0;

	static {
		todos.add(new Todo(++counter, "in28Minutes", "Learn Angular Js", new Date(), false));
		todos.add(new Todo(++counter, "in28Minutes", "Learn Spring Boot", new Date(), false));
		todos.add(new Todo(++counter, "in28Minutes", "Learn Angular 4", new Date(), false));
		todos.add(new Todo(++counter, "in28Minutes", "Learn Angular + Spring", new Date(), false));
	}

	public List<Todo> findAll() {
		return todos;
	}

	public Todo deleteById(long id) {
		
		Todo todo = findById(id);
		if (todo == null) return null;
		if (todos.remove(todo))
		{
			return todo;
		}
		return null;
	}

	public Todo findById(long id) {
		
		for (Todo todo : todos) {
			if (todo.getId() == id) {
				return todo;
			}
		}
		return null;
	}
	
	public Todo save(Todo todo) {
		
		if(todo.getId()<=0) {
			todo.setId(++counter);
			todos.add(todo);
		}
		else {
			deleteById(todo.getId());
			todos.add(todo);
		}
		return todo;
	}
	

}
