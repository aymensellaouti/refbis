import { HttpStatus, Injectable, NestMiddleware } from "@nestjs/common";
import { NextFunction, Request, Response } from "express";
import { Jwt, JwtPayload, verify } from "jsonwebtoken";

@Injectable()
export class AuthMiddleware implements NestMiddleware {
  use(req: Request, res: Response, next: NextFunction) {
    const token = req.get('auth-user');
    if (token) {
      try {
        const jwt: JwtPayload | string = verify(token, 'your-256-bit-secret');
        req['userId'] = jwt['userId'] ?? '';
        console.log('userId:', jwt['userId'] );
        next();
        return;
      } catch (e) {
        res.status(HttpStatus.UNAUTHORIZED).json({
          message: 'on ne vous connait pas au revoir'
        })
        .end();
        return;
      }
    } else {
      res.status(HttpStatus.UNAUTHORIZED).json({
        message: 'on ne vous connait pas au revoir'
      })
        .end();
      return;
    }
  }
}
