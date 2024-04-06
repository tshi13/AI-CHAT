import { User } from "src/user/entities/user.entity";
import {
  Column,
  CreateDateColumn,
  Entity,
  ManyToMany,
  ManyToOne,
  PrimaryGeneratedColumn,
} from "typeorm";

@Entity()
export class Project {
  @PrimaryGeneratedColumn("uuid")
  id: string;

  @Column()
  title: string;

  @Column()
  summary: string;

  @Column()
  deadline: string;
  
  @Column()
  teamSize: number;

  @Column()
  detail: string;

  @CreateDateColumn()
  createdAt: Date;

  @Column()
  updatedAt: Date;

  @ManyToOne(() => User, (user) => user.posts)
  creator: User;

  @ManyToMany(() => User, (user) => user.projects, { nullable: true })
  participants: User[];
}
