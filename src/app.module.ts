import { MiddlewareConsumer, Module, NestModule, RequestMethod } from "@nestjs/common";
import { AppController } from "./app.controller";
import { AppService } from "./app.service";
import { FirstModule } from "./first.module";
import { TodoModule } from "./todo/todo.module";
import { CommonModule } from "./common/common.module";
import { FirstMiddleware } from "./middlwares/first.middleware";
import { secondMiddleware } from "./middlwares/functions-middleware.middleware";
import { ConfigModule, ConfigService } from "@nestjs/config";
import { getConfig } from "./config/get.config";
import { TypeOrmModule } from "@nestjs/typeorm";
import { TodoEntity } from "./todo/entities/todo.entity";
import { CvModule } from './cv/cv.module';
import { UserModule } from './user/user.module';
import { SkillModule } from './skill/skill.module';
import { MulterModule } from "@nestjs/platform-express";
import { ServeStaticModule } from "@nestjs/serve-static";
import {join} from 'path';
@Module({
  imports: [FirstModule, TodoModule, CommonModule,
    ConfigModule.forRoot({
      isGlobal: true,
      load: [getConfig]
    }),
    TypeOrmModule.forRootAsync({
      useFactory: (configService: ConfigService) => {
        return {
          type: "mysql",
          host: configService.get('db.DB_HOST'),
          port: +configService.get('db.DB_PORD'),
          username: configService.get('db.DB_USERNAME'),
          password: configService.get('db.DB_PASSWORD'),
          database: configService.get('db.DB_NAME'),
          autoLoadEntities: true,
          synchronize: true,
          logging: true,
          cache: true
        };
      },
      inject: [ConfigService]
    }),
    CvModule,
    UserModule,
    SkillModule,
    ServeStaticModule.forRoot({
      rootPath: join(__dirname, '..', 'public'),
      serveStaticOptions: {
        index: false
      }
    }),
    MulterModule.register()
  ],
  controllers: [AppController],
  providers: [AppService]
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer): any {
    consumer
      .apply(FirstMiddleware).forRoutes({
      path: "*",
      method: RequestMethod.POST
    })
      .apply(secondMiddleware).forRoutes("")
    // .apply(AuthMiddleware).forRoutes(TodoController)
    ;
  }
}
