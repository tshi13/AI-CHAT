import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
  HttpStatus,
  HttpException,
  Query,
} from "@nestjs/common";
import { ProjectService } from "./project.service";
import { CreateProjectDto } from "./dto/create-project.dto";
import { UpdateProjectDto } from "./dto/update-project.dto";
import { JwtAuthGuard } from "src/auth/jwt-auth.guard";
import { GetProjectDto } from "./dto/get-project.dto";
import { JoinLeaveRequestDto } from "./dto/join-leave-project.dto";
import { UserService } from "src/user/user.service";

@Controller("project")
export class ProjectController {
  constructor(
    private readonly projectService: ProjectService,
    private readonly userService: UserService
  ) {}

  @UseGuards(JwtAuthGuard)
  @Post()
  async create(@Body() createProjectDto: CreateProjectDto) {
    const project = await this.projectService.create(createProjectDto);
    if (!project) {
      throw new HttpException(
        "Something went wrong",
        HttpStatus.INTERNAL_SERVER_ERROR
      );
    }
    console.log(project);
    return project;
  }

  @Post("join")
  async join(@Body() {userId, projectId}: JoinLeaveRequestDto) {
    const project = await this.projectService.findOne(projectId);
    const user = await this.userService.addProject(userId, project);
    const updatedProject = await this.projectService.addPartipant(user, projectId);
    if (!user || !updatedProject) {
      throw new HttpException(
        "Joining project failed",
        HttpStatus.INTERNAL_SERVER_ERROR
      );
    }
    return HttpStatus.OK;
  }

  @Post("leave")
  async leave(@Body() {userId, projectId}: JoinLeaveRequestDto) {
    const project = await this.projectService.findOne(projectId);
    const user = await this.userService.removeProject(userId, project);
    if (!user) {
      throw new HttpException(
        "Leaving project failed",
        HttpStatus.INTERNAL_SERVER_ERROR
      );
    }
    return HttpStatus.OK;
  }
  
  @Get(":id")
  findOne(@Param("id") id: string) {
    return this.projectService.findOne(id);
  }

  @Get(":id/participants")
  async getParticipants(@Param("id") id: string) {
    return await this.projectService.getParticipants(id);
  }

  @Get()
  async findAll(@Query() getProjectDto: GetProjectDto) {
    return await this.projectService.findAll(getProjectDto);
  }

  @Patch(":id")
  update(@Param("id") id: string, @Body() updateProjectDto: UpdateProjectDto) {
    return this.projectService.update(+id, updateProjectDto);
  }

  @Delete(":id")
  async remove(@Param("id") id: string) {
    return await this.projectService.remove(id);
  }
}
