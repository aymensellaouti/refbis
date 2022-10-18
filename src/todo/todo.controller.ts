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
import { AddTodoDto } from "./dto/add-todo.dto";
import { UpdateTodoDto } from "./dto/update-todo.dto";
import { TodoService } from "./todo.service";
import { isInstance } from "class-validator";
import { Request } from "express";

@Controller({
  path:'todo',
  version: '1'
})
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
  @Post('')
  addTodo(
    @Body() addTodoDto: AddTodoDto
  ): TodoModel {
    console.log('Post TODO');
    console.log(addTodoDto);
    console.log(addTodoDto instanceof AddTodoDto);
    const user = 1234;
    return this.todoService.addTodo(addTodoDto, user);
  }
  @Put(':id')
  updateTodo(
    @Param('id') id: string,
    @Body() updatedTodo: UpdateTodoDto,
    @Req() req: Request
  ): TodoModel {
    const user = req['userId'];
    return this.todoService.updateTodo(id, updatedTodo, user);
  }
  @Delete(':id')
  deleteTodo(
    @Param('id') id: string,
    @Req() req: Request): any {
    const user = req['userId'];
    return this.todoService.deleteTodo(id, user);
  }
}
