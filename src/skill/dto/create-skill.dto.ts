import { Column } from "typeorm";
import { IsString, MinLength } from "class-validator";
import { ErrorMessages } from "../../generics/error-messages";

export class CreateSkillDto {
  @IsString()
  @MinLength(10, {message : ErrorMessages.taille()})
  designation: string;
}
