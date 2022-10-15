import {
  Body,
  Controller,
  Delete,
  Get,
  Headers,
  HttpStatus, Inject,
  NotFoundException,
  Param,
  Post, Put,
  Req,
  Res
} from "@nestjs/common";
import { TodoModel } from "./model/todo-model";
import { Request, Response } from "express";
import { AddTodoDto } from "./dto/add-todo.dto";
import { UpdateTodoDto } from "./dto/update-todo.dto";
import { TodoService } from "./todo.service";

@Controller('todo')
export class TodoController {
  todos: TodoModel[] = [];
  constructor(private readonly todoService: TodoService) {}
  @Get()
  getTodos(
    // @Req() request: Request,
    // @Res() response: Response,
    // @Headers('Authorization') token
  ): TodoModel[] {
    // response
    //   .status(HttpStatus.OK)
    //   .json(this.todos)
    //   .end()
    // ;
    // return response;
    // console.log(token);
    // console.log(request);
    return this.todoService.getTodos();
  }
  @Get(':id')
  getTodo(@Param('id') id: string): TodoModel {
    return this.findTodoById(id);
  }
  private findTodoById(id: string): TodoModel {
   return this.todoService.getTodo(id);
  }
  @Post()
  addTodo(
    @Body() todo: AddTodoDto
  ): TodoModel {
    return this.todoService.addTodo(todo);
  }
  @Put(':id')
  updateTodo(
    @Param('id') id: string,
    @Body() updatedTodo: UpdateTodoDto
  ): TodoModel {
    return this.todoService.updateTodo(id, updatedTodo);
  }
  @Delete(':id')
  deleteTodo(@Param('id') id: string): any {
    return this.todoService.deleteTodo(id);
  }
}
