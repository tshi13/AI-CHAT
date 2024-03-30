import { Role } from "../entities/user.entity";

export class CreateUserDto {
  username: string;
  password: string;
  email: string;
  role: Role;
}
