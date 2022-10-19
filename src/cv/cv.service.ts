import { Injectable } from "@nestjs/common";
import { GenericCrudService } from "../generics/services/generic-crud.service";
import { Cv } from "./entities/cv.entity";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { User, UserRoles } from "../user/entities/user.entity";

@Injectable()
export class CvService extends GenericCrudService<Cv>{
  constructor(
    @InjectRepository(Cv)
    private readonly cvRepository: Repository<Cv>) {
    super(cvRepository);
  }

  findAll(user?: User): Promise<Cv[]> {
    const qb = this.cvRepository.createQueryBuilder('cv');
    if (user.role == UserRoles.user) {
      qb.where('cv.user.id = :user', {user: user.id});
    }
    return qb.getMany();
  }
}
