import { IsAlphanumeric, IsEnum, IsString, MaxLength, MinLength } from "class-validator";
import { Role } from "../entities/user.entity";

export class CreateUserDto {
  @IsAlphanumeric()
  @MinLength(6, {message: "Username is too short"})
  @MaxLength(15, {message: "Username is too long"})
  username: string;

  @IsAlphanumeric()
  @MinLength(6, { message: "Password is too short" })
  password: string;

  @IsEnum(Role)
  role: Role;
}
