import { Project } from "src/project/entities/project.entity";
import { Column, ManyToMany, OneToMany, PrimaryGeneratedColumn } from "typeorm";

export enum Role {
  STUDENT = "student",
  ORG = "org",
}

export class Skill {
  name: string;
  score: number;
  visible: boolean;
}

export class User {
  @PrimaryGeneratedColumn("uuid")
  id: string;

  @Column({ unique: true, nullable: true })
  email: string;

  @Column()
  education: string;

  @Column()
  name: string;

  @Column({ type: "enum", enum: Role })
  role: Role;

  @Column({ nullable: true })
  bio?: string;

  @Column({ type: "jsonb", nullable: true })
  skills?: Skill[];

  @OneToMany(() => Project, (project) => project.creator, { nullable: true })
  posts?: Project[];

  @ManyToMany(() => Project, (project) => project.participants)
  projects: Project[];
}
