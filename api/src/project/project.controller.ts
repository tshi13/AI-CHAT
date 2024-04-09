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

@Controller("project")
export class ProjectController {
  constructor(private readonly projectService: ProjectService) {}

  @UseGuards(JwtAuthGuard)
  @Post()
  async create(
    @Body() createProjectDto: CreateProjectDto,
  ) {
    const project = await this.projectService.create(createProjectDto);
    if (!project) {
      throw new HttpException(
        "Something went wrong",
        HttpStatus.INTERNAL_SERVER_ERROR
      );
    }
  }

  @Get()
  async findAll(
    @Query() getProjectDto: GetProjectDto
  ) {
    return await this.projectService.findAll(getProjectDto);
  }

  @Get(":id")
  findOne(@Param("id") id: string) {
    return this.projectService.findOne(+id);
  }

  @Patch(":id")
  update(@Param("id") id: string, @Body() updateProjectDto: UpdateProjectDto) {
    return this.projectService.update(+id, updateProjectDto);
  }

  @Delete(":id")
  remove(@Param("id") id: string) {
    return this.projectService.remove(+id);
  }
}
