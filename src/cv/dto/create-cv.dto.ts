import { Column } from "typeorm";
import { IsNotEmpty, IsNumber, IsOptional, IsString } from "class-validator";
import { Type } from "class-transformer";

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
}
