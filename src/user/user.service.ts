import { Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { InjectRepository } from "@nestjs/typeorm";
import { Skill } from "../skill/entities/skill.entity";
import { Repository } from "typeorm";
import { User } from "./entities/user.entity";
import { GenericCrudService } from "../generics/services/generic-crud.service";

@Injectable()
export class UserService extends GenericCrudService<User>{
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>) {
    super(userRepository);
  }
}
