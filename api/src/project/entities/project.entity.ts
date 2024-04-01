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

  @CreateDateColumn()
  createdAt: Date;

  @Column()
  updatedAt: Date;

  @Column()
  title: string;

  @Column()
  description: string;

  @Column()
  maxTeam: number;

  @Column()
  published: boolean;

  @Column()
  duration: number;

  @ManyToOne(() => User, (user) => user.posts)
  creator: User;

  @ManyToMany(() => User, (user) => user.projects, { nullable: true })
  participants: User[];
}
