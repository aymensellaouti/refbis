import { Type } from "class-transformer";
import { IsNumber, IsOptional } from "class-validator";

export class PaginateDto {
  @Type(() => Number)
  @IsOptional()
  @IsNumber()
  page: number;
  @Type(() => Number)
  @IsOptional()
  @IsNumber()
  nb: number;
}
