import { Column } from "typeorm";
import { IsNotEmpty, IsNumber, IsOptional, IsString } from "class-validator";
import { Type } from "class-transformer";
import { User } from "../../user/entities/user.entity";

export class CreateCvDto {
  @IsString()
  @IsNotEmpty()
  name: string;
  @Type(() => Number)
  @IsNumber()
  age: number;
  @IsNotEmpty()
  @IsString()
  job: string;

  path: string;
  user: User;
}
