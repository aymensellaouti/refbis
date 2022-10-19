import { NestFactory } from "@nestjs/core";
import { AppModule } from "./app.module";
import { ValidationPipe, VersioningType } from "@nestjs/common";
import { InterceptorInterceptor } from "./interceptors/interceptor.interceptor";
import * as dotenv from "dotenv";
import { ConfigService } from "@nestjs/config";

async function bootstrap() {
  dotenv.config();
  console.log('ENV TEST', process.env.TEST);
  const app = await NestFactory.create(AppModule);
  // app.useStaticAssets(join(__dirname, '..', 'public'), {
  //   index: false,
  //   prefix: '/public',
  // });
  const configService = app.get<ConfigService>(ConfigService);
  console.log('Port', configService.get('port'));
  app.enableCors({
    origin: 'http://localhost:4200'
  })
  app.enableVersioning({type: VersioningType.URI})
  app.useGlobalPipes(new ValidationPipe({
    transform: true
  }));
  app.useGlobalInterceptors(new InterceptorInterceptor());
  await app.listen(3000);
}
bootstrap();

