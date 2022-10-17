import { Injectable, Logger, NestMiddleware } from "@nestjs/common";
import { Request, Response } from "express";

@Injectable()
export class FirstMiddleware implements NestMiddleware {
  logger = new Logger(FirstMiddleware.name);
  use(req: Request, res: Response, next: () => void) {
    this.logger.log('FM');
    console.log(req.body);
    next();
  }
}
