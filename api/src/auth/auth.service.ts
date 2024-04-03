import { Injectable } from "@nestjs/common";
import { JwtService } from "@nestjs/jwt";
import { UserService } from "src/user/user.service";
import * as bcrypt from "bcrypt";
import { ResponseUserDto } from "src/user/dto/response-user.dto";

@Injectable()
export class AuthService {
  constructor(
    private usersService: UserService,
    private jwtService: JwtService
  ) {}

  async validateUser(
    username: string,
    pass: string
  ): Promise<ResponseUserDto | null> {
    const user = await this.usersService.findOne(username);
    if (user && (await bcrypt.compare(pass, user.password))) {
      const response = {
        id: user.id,
        username: user.username,
        role: user.role,
      };
      return response;
    }
    return null;
  }

  async login(user: ResponseUserDto) {
    return {
      access_token: this.jwtService.sign(user),
    };
  }
}
