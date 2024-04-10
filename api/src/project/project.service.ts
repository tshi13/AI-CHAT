import { Injectable } from "@nestjs/common";
import { CreateProjectDto } from "./dto/create-project.dto";
import { UpdateProjectDto } from "./dto/update-project.dto";
import { Repository } from "typeorm";
import { Project } from "./entities/project.entity";
import { InjectRepository } from "@nestjs/typeorm";
import { UserService } from "src/user/user.service";
import { GetProjectDto } from "./dto/get-project.dto";

@Injectable()
export class ProjectService {
  constructor(
    @InjectRepository(Project)
    private projectRepository: Repository<Project>
  ) {}

  async create(createProjectDto: CreateProjectDto) {
    const projectDetail = {
      ...createProjectDto,
      updatedAt: new Date(),
    };
    const projectQuery = await this.projectRepository.create(projectDetail);
    return this.projectRepository.save(projectQuery);
  }

  async findAll(getProjectDto: GetProjectDto) {
    const {offset, limit, order} = getProjectDto;
    const query = this.projectRepository
      .createQueryBuilder("project")
      .limit(limit)
      .offset(offset);
    query.orderBy("project.createdAt", order);
    return await query.getMany();
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
