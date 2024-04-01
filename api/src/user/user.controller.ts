import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
  UnauthorizedException,
} from "@nestjs/common";
import { UserService } from "./user.service";
import { CreateUserDto } from "./dto/create-user.dto";
import { LoginUserDto } from "./dto/login-user.dto";
import { AuthService } from "src/auth/auth.service";
import { JwtService } from "@nestjs/jwt";
import { ResponseUserDto } from "./dto/response-user.dto";

@Controller("user")
export class UserController {
  constructor(
    private readonly userService: UserService,
    private readonly authService: AuthService,
  ) {}

  @Post("register")
  async create(@Body() createUserDto: CreateUserDto): Promise<ResponseUserDto> {
    const user = await this.userService.create(createUserDto);
    return {
      id: user.id,
      username: user.username,
      role: user.role,
    };
  }

  @Post("login")
  async login(
    @Body() loginUserDto: LoginUserDto
  ): Promise<{ access_token: string }> {
    const user = await this.authService.validateUser(
      loginUserDto.username,
      loginUserDto.password
    );
    if (!user) {
      throw new UnauthorizedException("Invalid credentials.");
    }
    return await this.authService.login(user);
  }
}