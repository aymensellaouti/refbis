import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { FirstModule } from "./first.module";
import { TodoModule } from './todo/todo.module';

@Module({
  imports: [FirstModule, TodoModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
