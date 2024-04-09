import { IsAlpha, IsInt, IsOptional, Min } from "class-validator";

export class GetProjectDto {
  @IsInt()
  @IsOptional()
  @Min(0)
  offset: number = 0;

  @IsInt()
  @IsOptional()
  @Min(25)
  limit: number = 25;

  @IsAlpha()
  @IsOptional()
  order: "ASC" | "DESC" = "ASC";
}
