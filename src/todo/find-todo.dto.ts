import { TodoStatusEnum } from "./model/todo-model";
import { IsEnum, IsOptional, IsString } from "class-validator";
import { PaginateDto } from "./dto/paginate.dto";

export class FindTodoDto {
  @IsOptional()
  @IsString()
  search: string;
  @IsOptional()
  @IsEnum(TodoStatusEnum)
  status: TodoStatusEnum;
}
