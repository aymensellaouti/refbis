import { Injectable, NotFoundException } from "@nestjs/common";
import { TodoEntity } from "../../todo/entities/todo.entity";
import { DeleteResult } from "typeorm/query-builder/result/DeleteResult";
import { UpdateResult } from "typeorm/query-builder/result/UpdateResult";

import { Repository } from "typeorm";
import { HasIdInterface } from "../has-id.interface";


@Injectable()
export class GenericCrudService<Entity extends HasIdInterface> {
  constructor(
    private readonly repository: Repository<Entity>
  ) {
  }
  create(addDto): Promise<Entity> {
    return this.repository.save(addDto);
  }
  async update(id, updateDto): Promise<Entity> {
    const entity = await this.repository.preload({id, ...updateDto});
    if (! entity) {
      throw new NotFoundException('Not found');
    }
    return this.repository.save(entity);
  }
  async remove(id): Promise<DeleteResult> {
    const result: DeleteResult = await this.repository.delete(id);
    if (!result.affected) {
      throw new NotFoundException('Not Found');
    }
    return result;
  }
  async softDelete(id): Promise<UpdateResult> {
    const result: UpdateResult = await this.repository.softDelete(id);
    if (!result.affected) {
      throw new NotFoundException('Not Found');
    }
    return result;
  }
  async restore(id): Promise<UpdateResult> {
    const result: UpdateResult = await this.repository.restore(id);
    if (!result.affected) {
      throw new NotFoundException('Not Found');
    }
    return result;
  }
  findAll(): Promise<Entity[]> {
    return this.repository.find();
  }
  async findOne(id): Promise<Entity> {
    const entity = await this.repository.findOne({
      where: {id}
    });
    if (!entity) {
      throw new NotFoundException('Not Found');
    }
    return entity;
  }
}
