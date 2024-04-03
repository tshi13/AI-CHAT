import { IsAlphanumeric, IsString } from "class-validator";

export class LoginUserDto {
  @IsAlphanumeric()
  username: string;

  @IsAlphanumeric()
  password: string;
}
