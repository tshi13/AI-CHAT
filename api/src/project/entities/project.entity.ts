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

  @ManyToOne(() => User, (user) => user.posts)
  @JoinColumn({ name: "userId" })
  creator: User;

  @Column()
  userId: number;

  @ManyToMany(() => User, (user) => user.projects, { nullable: true })
  participants: User[];

  @Column()
  thumbnail: string =
    "https://www.adaptivewfs.com/wp-content/uploads/2020/07/logo-placeholder-image.png";
}
