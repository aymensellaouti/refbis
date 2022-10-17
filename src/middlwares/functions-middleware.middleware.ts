import { NextFunction, Request, Response } from "express";

export const secondMiddleware = (req: Request, res: Response, next: NextFunction) => {
  console.log(req.body);
  const ip = req.ip;
  const userAgent = req.get('user-agent');
  const method = req.method;
  console.log(`ip: ${ip} - user-agent: ${userAgent} - method: ${method}`);
  next();
}
