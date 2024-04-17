import { IsAlpha, IsInt } from "class-validator";

export class JoinRequestDto {
  @IsInt()
  userId: number;

  projectId: string;
}
