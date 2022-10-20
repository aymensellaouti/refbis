import { ForbiddenException, Inject, Injectable, NotFoundException } from "@nestjs/common";
import { TodoModel, TodoStatusEnum } from "./model/todo-model";
import { AddTodoDto } from "./dto/add-todo.dto";
import { UpdateTodoDto } from "./dto/update-todo.dto";
import { Brackets, Equal, ILike, MoreThan, Repository } from "typeorm";
import { TodoEntity } from "./entities/todo.entity";
import { InjectRepository } from "@nestjs/typeorm";
import { DeleteResult } from "typeorm/query-builder/result/DeleteResult";
import { UpdateResult } from "typeorm/query-builder/result/UpdateResult";
import { FindTodoDto } from "./find-todo.dto";
import { PaginateDto } from "./dto/paginate.dto";
import { paginateQb } from "../generics/qb/paginate.qb";
import { DateIntervalDto } from "./dto/date-interval.dto";
import { dateIntervalQb } from "../generics/qb/date-Interval.qb";
import { Cron, CronExpression } from "@nestjs/schedule";

@Injectable()
export class TodoService {
  todos: TodoModel[] = [];
  constructor(
    @Inject('UUID') private readonly uuid,
    @InjectRepository(TodoEntity)
    private readonly todoRepository: Repository<TodoEntity>
  ) {}
  //Db Processing
  create( addTodoDto: AddTodoDto): Promise<TodoEntity> {
    return this.todoRepository.save(addTodoDto);
  }
  async update(id: string, updatedTodo: UpdateTodoDto): Promise<TodoEntity> {
    const todo = await this.todoRepository.preload({id, ...updatedTodo});
    if (! todo) {
      throw new NotFoundException('Todo innexistant');
    }
    await this.todoRepository.update(1, {status: TodoStatusEnum.done});
    return this.todoRepository.save(todo);

  }
  async delete(id: string): Promise<DeleteResult> {
    const result: DeleteResult = await this.todoRepository.delete(id);
    if (!result.affected) {
      throw new NotFoundException('Todo innexistant');
    }
    return result;
  }
  async softDelete(id: string): Promise<UpdateResult> {
    const result: UpdateResult = await this.todoRepository.softDelete(id);
    if (!result.affected) {
      throw new NotFoundException('Todo innexistant');
    }
    return result;
  }
  async restore(id: string): Promise<UpdateResult> {
    const result: UpdateResult = await this.todoRepository.restore(id);
    if (!result.affected) {
      throw new NotFoundException('Todo innexistant');
    }
    return result;
  }
  findAll(findTodoDto: FindTodoDto): Promise<TodoEntity[]> {
    let where = [];
    const {status,search} = findTodoDto;
    if (search) {
      where.push({name: ILike(`%${search}%`)});
      where.push({description: ILike(`%${search}%`)});
    }
    if (status) {
      where.push({status: Equal(status)});
    }
    return this.todoRepository.find(where.length ? {where} : {});
  }
  findAllQB(findTodoDto: FindTodoDto & PaginateDto): Promise<TodoEntity[]> {
    const qb = this.todoRepository.createQueryBuilder('t');
    const {search, status, nb, page} = findTodoDto;
    if (search) {
      qb.where(
        new Brackets(
          qb=> {
            qb.where("t.name like :search", {search: `%${search}%`})
              .orWhere("t.description like :search", {search: `%${search}%`})
          }
        )
      );
    }
    if (status) {
      qb.andWhere('t.status = :status', {status})
    }
    if (page) {
      paginateQb(qb, page, nb);
    }
    qb.cache(20000)
    return qb.getMany();
  }
  testFindQB(): Promise<TodoEntity[]> {
    const qb = this.todoRepository.createQueryBuilder('t');
    qb.where('t.status IN (:...stat)', {stat: [TodoStatusEnum.waiting, TodoStatusEnum.actif]})
      .andWhere(
        new Brackets(
          qb=> {
            qb.where("t.createdAt < 2022-10-17")
              .orWhere("t.createdAt > 2022-10-18")
          }
        ));
    return qb.getMany();
  }
  findByDate(date: Date): Promise<TodoEntity[]> {
    return this.todoRepository.find({
      where: {
        createdAt: MoreThan(date)
      }
    });
  }
  async findOne(id: string): Promise<TodoEntity> {
    const todo = await this.todoRepository.findOne({
      where: {id}
    });
    if (!todo) {
      throw new NotFoundException('Todo innexistant');
    }
    return todo;
  }
  statsStatus(dateIntervalDto: DateIntervalDto) {
    const qb = this.todoRepository.createQueryBuilder('t');
    qb.select('t.status, count(*) as number');
    dateIntervalQb<TodoEntity>(qb, 't.createdAt', dateIntervalDto.dateMin, dateIntervalDto.dateMax);
    qb.groupBy('t.status');
    return qb.getRawMany();
  }
  //In Memory Processing
  getTodos(): TodoModel[] {
    console.log('in todoService');
    return this.todos;
  }
  getTodo(id: string): TodoModel {
    return this.findTodoById(id);
  }
  addTodo( todo: AddTodoDto, user: number): TodoModel {
    const { name, description } = todo;
    const newTodo = new TodoModel();
    newTodo.id = this.uuid();
    newTodo.name = name;
    newTodo.description =description;
    newTodo.owner = user;
    this.todos.push(newTodo);
    return newTodo;
  }
  updateTodo(id: string, updatedTodo: UpdateTodoDto, user = 0): TodoModel {
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

  @Cron(CronExpression.EVERY_DAY_AT_1AM)
  updateStatus() {
    const now = new Date();
    const qb = this.todoRepository.createQueryBuilder();
    qb.update(TodoEntity)
      .set({status: TodoStatusEnum.aborted})
      .where("createdAt < :date", {date: new Date(now.setMonth(now.getMonth() - 1))})
      .execute();
  }
}
