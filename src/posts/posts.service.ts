import { Injectable, UnauthorizedException} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from 'src/users/entities/user.entity';
import { Repository } from 'typeorm';
import {  Post } from './entity/post.entity';
import { error } from 'console';

@Injectable()
export class PostsService {

    constructor(
        @InjectRepository(Post)
         private readonly postRep:Repository <Post>,
        @InjectRepository(User)
        private readonly userRep:Repository <User>,
    ){}

    async createPost(id:number,title:string,content:string){
        const user = await this.userRep.findOneBy({id:id});
        if(!user){
            throw new error("user not found");
        }
        const post = this.postRep.create({title:title,content:content,user:user});
        return this.postRep.save(post);
    }

    async findAllPosts(id:number){
        return this.postRep.find({where:{user:{id}},relations:{user:true}});
    }

    async findPost(id:number,title:string){
        return this.postRep.findOne({where:{title:title,user:{id}},relations:{user:true}});
    }
      
    async updatePost(id:number,title:string,content:string,postId:number){
        const post = await this.postRep.findOne({where:{title:title,user:{id}},relations:{user:true}});
        if(!post){
            throw new error("post not found");
        }
        post.title=title;
        post.content=content;
        return this.postRep.save(post);
    }

    async deletePost(id:number,title:string){
        const post = await this.postRep.findOne({where:{title:title,user:{id}},relations:{user:true}});
        if(!post){
            throw new error("post not found");
        }
        return this.postRep.delete({title:title});
    }


}
