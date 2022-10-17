import { IsNumber, MinLength } from "class-validator";

export class OwnerModel {
  @MinLength(3)
  name: string;
  @IsNumber()
  age: number;
}
