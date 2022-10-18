import { Type } from "class-transformer";
import { IsDate, IsOptional } from "class-validator";

export class DateIntervalDto {
  @Type(() => Date)
  @IsOptional()
  @IsDate()
  dateMin: Date;
  @Type(() => Date)
  @IsOptional()
  @IsDate()
  dateMax: Date;
}
