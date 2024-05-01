import { Module } from "@nestjs/common";
import { ProjectService } from "./project.service";
import { ProjectController } from "./project.controller";
import { TypeOrmModule } from "@nestjs/typeorm";
import { User } from "src/user/entities/user.entity";
import { Project } from "./entities/project.entity";
import { UserService } from "src/user/user.service";
import { ConfigService } from "@nestjs/config";
import { JwtStrategy } from "src/auth/jwt.strategy";

@Module({
  imports: [TypeOrmModule.forFeature([Project, User])],
  providers: [ProjectService, UserService, JwtStrategy,ConfigService],
  controllers: [ProjectController],
  exports: [ProjectService],
})
export class ProjectModule {}
