import { AfterInsert, AfterRemove, AfterUpdate, BeforeInsert, Column, Entity, PrimaryGeneratedColumn } from "typeorm";
import { TodoStatusEnum } from "../model/todo-model";
import { TimeStampEntity } from "../../generics/entites/time-stamp.entity";

@Entity('todo')
export class TodoEntity extends TimeStampEntity{
  @PrimaryGeneratedColumn('uuid')
  id: string;
  @Column({
    length: 30
  })
  name: string;
  @Column({
    type: 'text'
  })
  description: string;
  @Column({
    type: 'enum',
    enum: TodoStatusEnum,
    default: TodoStatusEnum.waiting
  })
  status: TodoStatusEnum;

  @AfterInsert()
  afterCreateTodo() {
    console.log('After Insert');
    console.log(`New Todo created : `);
  }
  @BeforeInsert()
  beforeCreateTodo() {
    console.log(`Before create Todo : `, this);
  }
  @AfterUpdate()
  afterUpdateTodo() {
    console.log(`Todo with id: ${this.id} was updated new value : `, this);
  }
  @AfterRemove()
  afterRemoveTodo() {
    console.log(`Todo with id: ${this.id} was updated new value : `, this);
  }
}
