import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Post } from './interfaces/post.interface';
import { CreatePostDTO } from './dto/create-post.dto';

@Injectable()
export class BlogService {
    constructor(
        @InjectModel('Post') private readonly postModel : Model<Post>
    ) {}
    async getPosts() : Promise<Post[]> {
        return await this.postModel.find().exec();
    }
    async getPost(postID: string) : Promise<Post> {
        return await this.postModel.findById(postID).exec();
    }
    async createPost(createPostDTO : CreatePostDTO) : Promise<Post> {
        const newPost = new this.postModel(createPostDTO);
        return newPost.save();
    }
    async updatePost(postID: string, createPostDTO : CreatePostDTO) : Promise<Post> {
        const updatePost = await this.postModel.findByIdAndUpdate(postID, createPostDTO, { new: true });
        return updatePost;
    }
    async deletePost(postID: string) : Promise<any> {
        const deletedPost = await this.postModel.findByIdAndDelete(postID);
        return deletedPost;
    }
}
