import { Project } from "src/project/entities/project.entity";
import {
  Column,
  Entity,
  JoinColumn,
  JoinTable,
  ManyToMany,
  OneToMany,
  PrimaryGeneratedColumn,
} from "typeorm";

export enum Role {
  STUDENT = "student",
  ORG = "org",
}

export class Skill {
  name: string;
  score: number;
  visible: boolean;
}

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ unique: true })
  username: string;

  @Column()
  password: string;

  @Column({ type: "enum", enum: Role })
  role: Role;

  @Column({ unique: true, nullable: true })
  email?: string;

  @Column({ nullable: true })
  education?: string;

  @Column({ nullable: true })
  name?: string;

  @Column({ nullable: true })
  bio?: string;

  @Column({ type: "jsonb", nullable: true })
  skills?: Skill[];

  @OneToMany(() => Project, (project) => project.creator)
  posts: Project[];

  @ManyToMany(() => Project, (project) => project.participants)
  @JoinTable()
  projects: Project[];
}
