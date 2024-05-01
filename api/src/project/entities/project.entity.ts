import { User } from "src/user/entities/user.entity";
import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
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
  deadline: Date;

  @Column()
  teamSize: number;

  @Column()
  detail: string;

  @CreateDateColumn()
  createdAt: Date;

  @Column()
  updatedAt: Date;

  @Column()
  userId: number;

  @ManyToMany(() => User, user => user.projects)
  participants: User[];

  @Column()
  thumbnail: string =
  "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ75Q9EvClA_AXpsxkvrXrLRQS6iLAI-Y_MV9FKjZDSEw&s";
    // "https://www.adaptivewfs.com/wp-content/uploads/2020/07/logo-placeholder-image.png";
}
