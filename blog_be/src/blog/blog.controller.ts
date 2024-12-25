import { Body, Controller, Delete, Get, NotFoundException, Param, Post, Put, Query, Res, UseGuards } from '@nestjs/common';
import { BlogService } from './blog.service';
import { CreatePostDTO } from './dto/create-post.dto';
import { ValidateObjectId } from './shared/pipes/validate-object-id.pipe';
import { AuthGuard } from 'src/guard/auth.guard';

@Controller('blog')
export class BlogController {
    constructor(
        private readonly blogService: BlogService
    ) {}
    @Get('/posts')
    async getPosts(@Res() res) {
        const post  = await this.blogService.getPosts();
        return res.status(200).json(post);
    }
    @Get('/post/:postID')
    async getPost(@Res() res, @Param('postID', new ValidateObjectId()) postID) {
        const post = await this.blogService.getPost(postID);
        if(!post) throw new NotFoundException('Post not found');
        return res.status(200).json(post);
    }
    @UseGuards(AuthGuard)
    @Post('/create')
    async createPost(@Res() res, @Body() createPostDTO : CreatePostDTO) {
        const newPost = this.blogService.createPost(createPostDTO);
        return res.status(200).json({
            message: "Post have been created successfully",
            post: newPost
        });
    }
    @UseGuards(AuthGuard)
    @Put('/update')
    async updatePost(
        @Res() res, 
        @Query('postID', new ValidateObjectId()) postID,
        @Body() createPostDTO : CreatePostDTO
    ) {
        const editedPost = await this.blogService.updatePost(postID, createPostDTO);
        if (!editedPost) throw new NotFoundException('Post does not exist!');
        return res.status(200).json({
            message: 'Post has been successfully updated',
            post: editedPost
        })
    }
    @UseGuards(AuthGuard)
    @Delete('/delete')
    async deletePost(@Res() res, @Query('postID', new ValidateObjectId()) postID) {
        const deletedPost = await this.blogService.deletePost(postID);
        if (!deletedPost) throw new NotFoundException('Post does not exist!');
        return res.status(200).json({
            message: 'Post has been deleted!',
            post: deletedPost
        })
    }
}


