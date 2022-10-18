import { Injectable } from '@nestjs/common';
import { CreateSkillDto } from './dto/create-skill.dto';
import { UpdateSkillDto } from './dto/update-skill.dto';
import { Repository } from "typeorm";
import { Skill } from "./entities/skill.entity";
import { InjectRepository } from "@nestjs/typeorm";
import { GenericCrudService } from "../generics/services/generic-crud.service";

@Injectable()
export class SkillService extends GenericCrudService<Skill>{
 constructor(
   @InjectRepository(Skill)
   private readonly skillRepository: Repository<Skill>) {
   super(skillRepository);
 }
}
