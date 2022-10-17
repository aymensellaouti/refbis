import { ForbiddenException, Inject, Injectable, NotFoundException } from "@nestjs/common";
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
    todo: AddTodoDto,
    user: number
  ): TodoModel {
    const { name, description } = todo;
    const newTodo = new TodoModel();
    newTodo.id = this.uuid();
    newTodo.name = name;
    newTodo.description =description;
    newTodo.owner = user;
    this.todos.push(newTodo);
    return newTodo;
  }
  updateTodo(
    id: string,
    updatedTodo: UpdateTodoDto,
    user = 0
  ): TodoModel {
    const todo = this.findTodoById(id);
    if (todo.owner != user) {
      throw new ForbiddenException('Vous n avez pas le droit de modifier ce todo');
    }
    const { name, description, status } = updatedTodo;
    todo.name =  name ?? todo.name;
    todo.description =  description ?? todo.description;
    todo.status =  status ?? todo.status;
    return todo;
  }
  deleteTodo(id: string, user = 0): any {
    const size = this.todos.length;
    this.todos = this.todos.filter(todo => todo.id != id || (todo.id == id && todo.owner != user));
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
