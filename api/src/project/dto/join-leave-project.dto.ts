import { IsAlpha, IsInt } from "class-validator";

export class JoinLeaveRequestDto {
  @IsInt()
  userId: number;

  projectId: string;
}
