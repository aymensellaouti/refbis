import { v4 as uuidV4} from 'uuid';
export class TodoModel {
  constructor(
    public id: string = uuidV4(),
    public name: string = '',
    public description: string = '',
    public createdAt: Date = new Date(),
    public status: TodoStatusEnum = TodoStatusEnum.waiting,
) {}
}

export enum TodoStatusEnum {
  'actif' = 'En cours',
  'waiting' = 'En attente',
  'done' = 'Finalisé'
}
