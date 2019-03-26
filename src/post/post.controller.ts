/**
 * @author wsq
 * @email wsq961@outlook.com
 */
import { Controller, Body, Post } from '@nestjs/common';
import { CreatePostDto } from './dto/create-post.dto';
import { PostService } from './post.service';
import { Auth } from 'src/app.decorator';

@Controller('post')
export class PostController {
    constructor(private readonly postService: PostService) {}
    @Post()
    @Auth('ADMIN', 'SUPER_ADMIN')
    createPost(@Body() body: CreatePostDto) {
        return this.postService.createPost(body);
    }
}
