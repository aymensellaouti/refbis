import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";
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
}
