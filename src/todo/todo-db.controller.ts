import {
  Body,
  Controller,
  Delete,
  Get,
  Headers,
  HttpStatus, Inject,
  NotFoundException,
  Param,
  Post, Put, Query,
  Req,
  Res
} from "@nestjs/common";
import { TodoModel } from "./model/todo-model";
import { AddTodoDto } from "./dto/add-todo.dto";
import { UpdateTodoDto } from "./dto/update-todo.dto";
import { TodoService } from "./todo.service";
import { isInstance } from "class-validator";
import { Request } from "express";
import { TodoEntity } from "./entities/todo.entity";
import { DeleteResult } from "typeorm/query-builder/result/DeleteResult";
import { UpdateResult } from "typeorm/query-builder/result/UpdateResult";
import { FindTodoDto } from "./find-todo.dto";
import { PaginateDto } from "./dto/paginate.dto";
import { DateIntervalDto } from "./dto/date-interval.dto";

@Controller({
  path:'todo',
  version: '2'
})
export class TodoDbController {
  todos: TodoModel[] = [];
  constructor(private readonly todoService: TodoService) {}
  @Get()
  getTodos(@Query() findTodoDto: FindTodoDto & PaginateDto): Promise<TodoEntity[]> {
    // response
    //   .status(HttpStatus.OK)
    //   .json(this.todos)
    //   .end()
    // ;
    // return response;
    // console.log(token);
    // console.log(request);
    // return this.todoService.findAll(findTodoDto);
    return this.todoService.findAllQB(findTodoDto);
  }
  @Get('stats')
  statsStatus(@Query() dateIntervalDto: DateIntervalDto) {
    return this.todoService.statsStatus(dateIntervalDto);
  }
  @Get('qb')
  getQBTodos(): Promise<TodoEntity[]> {
    return this.todoService.testFindQB();
  }
  @Get('/date/:date')
  getDateTodos(@Param('date') date: Date): Promise<TodoEntity[]> {
    console.log('date', date);
    return this.todoService.findByDate(date);
  }
  @Get(':id')
  getTodo(@Param('id') id: string): Promise<TodoEntity> {
    return this.todoService.findOne(id);
  }
  private findTodoById(id: string): TodoModel {
   return this.todoService.getTodo(id);
  }
  @Post('')
  addTodo(
    @Body() addTodoDto: AddTodoDto
  ): Promise<TodoEntity> {
    return this.todoService.create(addTodoDto);
  }
  @Put(':id')
  update(
    @Param('id') id: string,
    @Body() updatedTodo: UpdateTodoDto
  ): Promise<TodoEntity> {
    return this.todoService.update(id, updatedTodo);
  }
  @Delete(':id')
  deleteTodo(
    @Param('id') id: string): Promise<DeleteResult> {
    return this.todoService.delete(id);
  }
  @Put('soft/:id')
  softDelete(
    @Param('id') id: string): Promise<UpdateResult> {
    return this.todoService.softDelete(id);
  }
  @Put('restore/:id')
  restore(
  @Param('id') id: string): Promise<UpdateResult> {
    return this.todoService.restore(id);
  }
}
