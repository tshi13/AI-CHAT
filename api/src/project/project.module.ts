import { Module } from "@nestjs/common";
import { ProjectService } from "./project.service";
import { ProjectController } from "./project.controller";
import { TypeOrmModule } from "@nestjs/typeorm";
import { User } from "src/user/entities/user.entity";
import { Project } from "./entities/project.entity";
import { UserService } from "src/user/user.service";
import { ConfigService } from "@nestjs/config";

@Module({
  imports: [TypeOrmModule.forFeature([Project, User])],
  providers: [ProjectService, UserService, ConfigService],
  controllers: [ProjectController],
})
export class ProjectModule {}
