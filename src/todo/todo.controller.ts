import {
  Body,
  Controller,
  Delete,
  Get,
  Headers,
  HttpStatus,
  NotFoundException,
  Param,
  Post, Put,
  Req,
  Res
} from "@nestjs/common";
import { TodoModel } from "./model/todo-model";
import { Request, Response } from "express";

@Controller('todo')
export class TodoController {
  todos: TodoModel[] = [];

  @Get()
  getTodos(
    @Req() request: Request,
    @Res() response: Response,
    @Headers('Authorization') token
  ): TodoModel[] {
    // response
    //   .status(HttpStatus.OK)
    //   .json(this.todos)
    //   .end()
    // ;
    // return response;
    // console.log(token);
    // console.log(request);
    return this.todos;
  }
  @Get(':id')
  getTodo(@Param('id') id: string): TodoModel {
    return this.findTodoById(id);
  }
  private findTodoById(id: string): TodoModel {
    const todo = this.todos.find(todoItem => todoItem.id == id);
    if (!todo) {
      throw new NotFoundException('Todo Innexistant');
    }
    return todo;
  }
  @Post()
  addTodo(
    @Body() todo: Partial<TodoModel>
  ): TodoModel {
    const { name, description } = todo;
    const newTodo = new TodoModel();
    newTodo.name = name;
    newTodo.description =description;
    this.todos.push(newTodo);
    return newTodo;
  }
  @Put(':id')
  updateTodo(
    @Param(':id') id: string,
    @Body() updatedTodo: Partial<TodoModel>
  ): TodoModel {
    const todo = this.findTodoById(id);
    const { name, description, status } = updatedTodo;
    todo.name =  name ?? todo.name;
    todo.description =  description ?? todo.description;
    todo.status =  status ?? todo.status;
    return todo;
  }
  @Delete(':id')
  deleteTodo(@Param(':id') id: string): any {
    const size = this.todos.length;
    this.todos = this.todos.filter(todo => todo.id != id);
    if (this.todos.length == size) {
      throw new NotFoundException('Todo innexistant');
    }
    return { count: 1 };
  }
}
