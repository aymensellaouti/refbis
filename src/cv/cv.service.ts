import { CACHE_MANAGER, Inject, Injectable } from "@nestjs/common";
import { GenericCrudService } from "../generics/services/generic-crud.service";
import { Cv } from "./entities/cv.entity";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { User, UserRoles } from "../user/entities/user.entity";
import { EventEmitter2 } from "@nestjs/event-emitter";
import { constantes } from "../config/constantes.config";
import {Cache} from 'cache-manager';
import { Cron, CronExpression, Interval } from "@nestjs/schedule";

@Injectable()
export class CvService extends GenericCrudService<Cv>{
  constructor(
    @InjectRepository(Cv)
    private readonly cvRepository: Repository<Cv>,
    private readonly eventEmitter: EventEmitter2,
    @Inject(CACHE_MANAGER) private readonly cacheManager: Cache
  ) {
    super(cvRepository);
  }

  async findAll(user?: User): Promise<Cv[]> {
    const cvs: Cv[] = await this.cacheManager.get(constantes.cache.cv.list + user.id);
    if (cvs) {
      console.log('Cached List :', cvs);
      return cvs;
    } else {
      const qb = this.cvRepository.createQueryBuilder('cv');
      if (user.role == UserRoles.user) {
        qb.where('cv.user.id = :user', {user: user.id});
      }
      const cvs = await qb.getMany();
      this.cacheManager.set(constantes.cache.cv.list + user.id, cvs);
      return cvs;
    }
  }
  async create(addDto): Promise<Cv> {
    const cv = await super.create(addDto);
    // We can handle it as an event
    this.cacheManager.del(constantes.cache.cv.list + cv.user.id);
    this.eventEmitter.emit(constantes.events.cv.add, cv);
    return cv;
  }
  // @Interval(5000)
  // beNiceSayHello() {
  //   console.log('Hello :D');
  // }
  // @Cron(5000)
  // beNiceSayHellos() {
  //   console.log('Hello :D');
  // }
}
