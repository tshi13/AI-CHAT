import { Injectable } from "@nestjs/common";
import { CreateUserDto } from "./dto/create-user.dto";
import { InjectRepository } from "@nestjs/typeorm";
import { User } from "./entities/user.entity";
import { Repository } from "typeorm";
import { ConfigService } from "@nestjs/config";
import * as bcrypt from "bcrypt";
import { JoinRequestDto } from "src/project/dto/join-project.dto";
import { Project } from "src/project/entities/project.entity";
import { ProjectService } from "src/project/project.service";

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private userRepository: Repository<User>,
    private configService: ConfigService
  ) {}

  async create(createUserDto: CreateUserDto) {
    const { password, ...data } = createUserDto;
    const saltRound = Number(
      await this.configService.get<number>("BCRYPT_SALT")
    );
    const queryData = {
      password: await bcrypt.hash(password, saltRound),
      ...data,
    };
    const user = this.userRepository.create(queryData);
    return this.userRepository.save(user);
  }

  async findOne(username: string): Promise<User | undefined> {
    return this.userRepository.findOneBy({ username });
  }

  async addProject(id: number, project: Project) {
    const user = await this.userRepository.findOne({
      where: { id },
      relations: ['projects'],
    });
    await user.projects.push(project);
    return await this.userRepository.save(user);
  }

  async findOneById(id: number): Promise<User | undefined> {
    return this.userRepository.findOneBy({ id });
  }

  async getUserProjects(id: number) {
    const user = await this.userRepository.findOne({
      where: { id },
      relations: ['projects'],
    });
    return user.projects;
  }
}
