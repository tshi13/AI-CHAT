import { Injectable } from "@nestjs/common";
import { CreateProjectDto } from "./dto/create-project.dto";
import { UpdateProjectDto } from "./dto/update-project.dto";
import { Repository } from "typeorm";
import { Project } from "./entities/project.entity";
import { InjectRepository } from "@nestjs/typeorm";
import { UserService } from "src/user/user.service";

@Injectable()
export class ProjectService {
  constructor(
    @InjectRepository(Project)
    private projectRepository: Repository<Project>
  ) {}

  create(createProjectDto: CreateProjectDto) {
    const projectDetail = {
      ...createProjectDto,
      updatedAt: new Date(),
    };
    const projectQuery = this.projectRepository.create(projectDetail);
    return this.projectRepository.save(projectQuery);
  }

  findAll() {
    return `This action returns all project`;
  }

  findOne(id: number) {
    return `This action returns a #${id} project`;
  }

  update(id: number, updateProjectDto: UpdateProjectDto) {
    return `This action updates a #${id} project`;
  }

  remove(id: number) {
    return `This action removes a #${id} project`;
  }
}
