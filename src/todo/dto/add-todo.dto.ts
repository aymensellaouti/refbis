import { IsNumber, MaxLength, MinLength, ValidateNested } from "class-validator";
import { ErrorMessages } from "../../generics/error-messages";
import { Type } from "class-transformer";
import { OwnerModel } from "../model/owner.model";

export class AddTodoDto {
  @MinLength(3, {
    message: ErrorMessages.taille()
  })
  @MaxLength(10, {
  message: ErrorMessages.taille(false)
})
  name: string;
  @MinLength(10, {
    message: ErrorMessages.taille()
  })
  @MaxLength(255, {
    message: ErrorMessages.taille(false)
  })
  description: string

  // @IsNumber()
  // @Type(() => Number)
  // priority: number;
  // @ValidateNested()
  // @Type(() => OwnerModel)
  // owner: OwnerModel;
}
