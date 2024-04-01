import { HttpException, HttpStatus, Injectable } from "@nestjs/common";
import { CreateUserDto } from "./dto/create-user.dto";
import { InjectRepository } from "@nestjs/typeorm";
import { User } from "./entities/user.entity";
import { Repository } from "typeorm";
import { ConfigService } from "@nestjs/config";
import * as bcrypt from "bcrypt";

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private userRepository: Repository<User>,
    private configService: ConfigService
  ) {}

  async create(createUserDto: CreateUserDto) {
    const { password, ...data } = createUserDto;
    const userExists = await this.userRepository.existsBy({
      username: data.username,
    });
    if (userExists) {
      throw new HttpException("Invalid username", HttpStatus.BAD_REQUEST);
    }
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
}
