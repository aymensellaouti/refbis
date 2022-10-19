import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { Observable } from 'rxjs';
import { Reflector } from "@nestjs/core";
import { Request } from "express";
import { User } from "../../user/entities/user.entity";

@Injectable()
export class RoleGuard implements CanActivate {
  constructor(private readonly reflector: Reflector) {
  }
  canActivate(
    context: ExecutionContext,
  ): boolean | Promise<boolean> | Observable<boolean> {
    const request: Request = context.switchToHttp().getRequest();
    const className = context.getClass();
    const handlerName = context.getHandler();
    const user = request.user;
    console.log(`Your are in class ${className} and you want to rach Handler ${handlerName}`);
    const allowedRoles = this.reflector.getAllAndMerge('roles',[className, handlerName]);
    console.log(`AllowedRoles are ${allowedRoles} and your role is ${user['role']}`);
    return allowedRoles.includes(user['role']);
  }
}
