import { Post } from "src/posts/entity/post.entity";
import { Role } from "src/roles/role.enum";
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class User {
    @PrimaryGeneratedColumn()
    id:number;

    @Column({unique:true})
    email:string;

    @Column()
    name:string;

    @Column()
    password:string;

    @Column({type:'enum',enum:Role,default:Role.User})
    role:Role;
    @OneToMany(() => Post, post => post.user)
    posts:Post[];
}