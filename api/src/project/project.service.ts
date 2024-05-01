import { forwardRef, Inject, Injectable } from "@nestjs/common";
import { CreateProjectDto } from "./dto/create-project.dto";
import { UpdateProjectDto } from "./dto/update-project.dto";
import { Repository } from "typeorm";
import { Project } from "./entities/project.entity";
import { InjectRepository } from "@nestjs/typeorm";
import { UserService } from "src/user/user.service";
import { GetProjectDto } from "./dto/get-project.dto";
import { User } from "src/user/entities/user.entity";

@Injectable()
export class ProjectService {
  constructor(
    @InjectRepository(Project)
    private projectRepository: Repository<Project>,
    @Inject(forwardRef(() => UserService))
    private userService: UserService
  ) {}

  async create(createProjectDto: CreateProjectDto) {
    const projectDetail = {
      ...createProjectDto,
      updatedAt: new Date(),
    };
    const projectQuery = await this.projectRepository.create(projectDetail);
    this.userService.addProject(createProjectDto.userId, projectQuery);
    return this.projectRepository.save(projectQuery);
  }

  async findAll(getProjectDto: GetProjectDto) {
    const { offset, limit, order } = getProjectDto;
    const query = this.projectRepository
      .createQueryBuilder("project")
      .limit(limit)
      .offset(offset);
    query.orderBy("project.createdAt", order);
    return await query.getMany();
  }

  async findOne(id: string): Promise<Project> {
    return await this.projectRepository.findOneBy({ id });
  }

  update(id: number, updateProjectDto: UpdateProjectDto) {
    return `This action updates a #${id} project`;
  }

  async addPartipant(user: User, id: string) {
    const project = await this.projectRepository.findOne({
      where: { id },
      relations: ["participants"],
    });
    await project.participants.push(user);
    return await this.projectRepository.save(project);
  }

  async removeParticipant(user: User, id: string) {
    const project = await this.projectRepository.findOne({
      where: { id },
      relations: ["participants"],
    });
    project.participants = project.participants.filter(
      (p) => p.id !== user.id
    );
    return await this.projectRepository.save(project);
  }

  async remove(id: string) {
    return await this.projectRepository.delete(id);
  }

  async getParticipants(id: string) {
    const project = await this.projectRepository.findOne({
      where: { id },
      relations: ["participants"],
    });
    const ids = project.participants.map((p) => p.id);
    return await this.userService.getUsersByIds(ids);
  }
}
