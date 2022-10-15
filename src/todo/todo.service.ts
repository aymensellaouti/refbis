import { Inject, Injectable, NotFoundException } from "@nestjs/common";
import { TodoModel } from "./model/todo-model";
import { AddTodoDto } from "./dto/add-todo.dto";
import { UpdateTodoDto } from "./dto/update-todo.dto";

@Injectable()
export class TodoService {
  todos: TodoModel[] = [];
  constructor(@Inject('UUID') private readonly uuid) {}
  getTodos(): TodoModel[] {
    console.log('in todoService');
    return this.todos;
  }
  getTodo(id: string): TodoModel {
    return this.findTodoById(id);
  }
  addTodo(
    todo: AddTodoDto
  ): TodoModel {
    const { name, description } = todo;
    const newTodo = new TodoModel();
    newTodo.id = this.uuid();
    newTodo.name = name;
    newTodo.description =description;
    this.todos.push(newTodo);
    return newTodo;
  }
  updateTodo(
    id: string,
    updatedTodo: UpdateTodoDto
  ): TodoModel {
    const todo = this.findTodoById(id);
    const { name, description, status } = updatedTodo;
    todo.name =  name ?? todo.name;
    todo.description =  description ?? todo.description;
    todo.status =  status ?? todo.status;
    return todo;
  }
  deleteTodo(id: string): any {
    const size = this.todos.length;
    this.todos = this.todos.filter(todo => todo.id != id);
    if (this.todos.length == size) {
      throw new NotFoundException('Todo innexistant');
    }
    return { count: 1 };
  }
  private findTodoById(id: string): TodoModel {
    const todo = this.todos.find(todoItem => todoItem.id == id);
    console.log(todo);
    if (!todo) {
      throw new NotFoundException('Todo Innexistant');
    }
    return todo;
  }
}
