import { User } from "src/user/entities/user.entity";
import { Column, CreateDateColumn, Entity, ManyToOne, PrimaryColumn, PrimaryGeneratedColumn, Unique } from "typeorm"

@Entity()
export class Project {
    @PrimaryGeneratedColumn("uuid")
    id: string;

    @Column("date")
    createdAt: Date;

    @CreateDateColumn()
    updatedAt: Date;

    @Column("string")
    title: string;

    @Column("string")
    description: string;

    @Column("int")
    maxTeam: number;

    @Column("bool")
    published: boolean;

    @ManyToOne(() => User, (user) => user.projects)
    user: User;
}

/*
https://orkhan.gitbook.io/typeorm/docs/entities#primary-columns
https://orkhan.gitbook.io/typeorm/docs/entities#columns-with-generated-values
*/