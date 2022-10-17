import { TodoStatusEnum } from "../model/todo-model";
import { PartialType } from "@nestjs/mapped-types";
import { AddTodoDto } from "./add-todo.dto";
import { IsEnum, IsOptional } from "class-validator";
import { ErrorMessages } from "../../generics/error-messages";

export class UpdateTodoDto extends PartialType(AddTodoDto){
  @IsOptional()
  @IsEnum(TodoStatusEnum, {
    message: ErrorMessages.status()
  })
  status: TodoStatusEnum;
}
