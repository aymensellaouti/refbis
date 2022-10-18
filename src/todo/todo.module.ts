import { Module, VersioningType } from "@nestjs/common";
import { TodoController } from './todo.controller';
import { TodoService } from './todo.service';
import { TypeOrmModule } from "@nestjs/typeorm";
import { TodoEntity } from "./entities/todo.entity";
import { TodoDbController } from "./todo-db.controller";

@Module({
  imports: [
    TypeOrmModule.forFeature([TodoEntity])
  ],
  controllers: [TodoController, TodoDbController],
  providers: [TodoService]
})
export class TodoModule {}


