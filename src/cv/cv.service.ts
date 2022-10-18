import { Injectable } from '@nestjs/common';
import { CreateCvDto } from './dto/create-cv.dto';
import { UpdateCvDto } from './dto/update-cv.dto';
import { GenericCrudService } from "../generics/services/generic-crud.service";
import { Cv } from "./entities/cv.entity";
import { InjectRepository } from "@nestjs/typeorm";
import { Skill } from "../skill/entities/skill.entity";
import { Repository } from "typeorm";

@Injectable()
export class CvService extends GenericCrudService<Cv>{
  constructor(
    @InjectRepository(Cv)
    private readonly cvRepository: Repository<Cv>) {
    super(cvRepository);
  }
}
