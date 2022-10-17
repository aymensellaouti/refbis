import { MiddlewareConsumer, Module, NestModule, RequestMethod } from "@nestjs/common";
import { AppController } from "./app.controller";
import { AppService } from "./app.service";
import { FirstModule } from "./first.module";
import { TodoModule } from "./todo/todo.module";
import { CommonModule } from "./common/common.module";
import { FirstMiddleware } from "./middlwares/first.middleware";
import { secondMiddleware } from "./middlwares/functions-middleware.middleware";
import { AuthMiddleware } from "./middlwares/auth.middleware";
import { TodoController } from "./todo/todo.controller";

@Module({
  imports: [FirstModule, TodoModule, CommonModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer): any {
    consumer
    .apply(FirstMiddleware).forRoutes({
      path: '*',
      method: RequestMethod.POST
    })
    .apply(secondMiddleware).forRoutes('')
    .apply(AuthMiddleware).forRoutes(TodoController)
    ;

  }
}
