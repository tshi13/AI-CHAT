import { Role } from "../entities/user.entity";

export class ResponseUserDto {
  id: number;
  username: string;
  role: Role;
}
