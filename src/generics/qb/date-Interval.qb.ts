import { SelectQueryBuilder } from "typeorm";

export function dateIntervalQb<Entity>(qb:  SelectQueryBuilder<Entity>, name: string = 'date', dateMin?, dateMax?) {
  console.log(dateMin, dateMax);
  console.log();
  if (dateMin) {
    qb.andWhere(`${name} > :dateMin`, {dateMin})
  }
  if (dateMax) {
    qb.andWhere(`${name} < :dateMax`, {dateMax})
  }
}
