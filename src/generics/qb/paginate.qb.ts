import { SelectQueryBuilder } from "typeorm";

export function paginateQb (qb:  SelectQueryBuilder<any>, page = 1, nb = 10) {
  if (page) {
    const limit = (page - 1) * nb;
    console.log(limit, nb);
    qb.take(nb)
      .skip(limit);
  }
}
