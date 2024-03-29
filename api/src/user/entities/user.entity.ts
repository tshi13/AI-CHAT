import { Project } from "src/project/entities/project.entity";
import { Column, OneToMany, PrimaryGeneratedColumn } from "typeorm";

enum Role {
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

  @Column()
  email: string;

  @Column({ unique: true })
  name: string;

  @Column({ type: "enum", enum: Role })
  role: Role;

  @Column({ nullable: true })
  bio?: string;

  @Column({ type: "jsonb", nullable: true })
  skills: Skill[];

  @OneToMany(() => Project, (project) => project.user)
  projects: Project[];
}
