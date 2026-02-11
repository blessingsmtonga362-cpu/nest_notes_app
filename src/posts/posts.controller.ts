import { Body, Controller, Post,Request,Get,UseGuards, Patch, Delete } from '@nestjs/common';
import { PostsService } from './posts.service';
import { AuthGuard } from 'src/auth/auth.guard';


@UseGuards(AuthGuard)
@Controller('posts')
export class PostsController {
    constructor(private readonly postService:PostsService){}
    
    @Post()
    create(@Request() req,@Body() body){
        console.log(req.user);//i want to test if its giving me the correct user
        return this.postService.createPost(req.user.id,body.title,body.content);
}

    @Get()
    findAll(@Request() req){
        return this.postService.findAllPosts(req.user.id);
    }

    @Get('one')
    findOne(@Request() req,@Body() body){
        return this.postService.findPost(req.user.id,body.title);}

    @Patch()
    update(@Request() req,@Body() body){
        return this.postService.updatePost(req.user.id,body.title,body.content,body.postId);
    }  
    @Delete()
    delete(@Request() req,@Body() body){
        return this.postService.deletePost(req.user.id,body.title);
    }}