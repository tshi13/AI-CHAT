import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { User } from "src/user/entities/user.entity";
import { UserService } from "src/user/user.service";
import { ConfigModule, ConfigService } from "@nestjs/config";
import { Project } from "src/project/entities/project.entity";
import { ProjectService } from "src/project/project.service";
import { UserController } from "./user.controller";
import { AuthService } from "src/auth/auth.service";
import { JwtModule } from "@nestjs/jwt";

@Module({
  imports: [
    TypeOrmModule.forFeature([User]),
    JwtModule.registerAsync({
      imports: [ConfigModule],
      useFactory: (configService: ConfigService) => ({
        secret: configService.get<string>("JWT_SECRET"),
        signOptions: { expiresIn: configService.get<string>("JWT_EXPIRE") },
      }),
      inject: [ConfigService],
    }),
  ],
  providers: [UserService, AuthService, ConfigService],
  controllers: [UserController],
  exports: [UserService],
})
export class UserModule {}
