/**
 * @author wsq
 * @email wsq961@outlook.com
 */
import { Controller, Body, Post, Get, Query } from '@nestjs/common';
import { CreatePostDto } from './dto/create-post.dto';
import { PostService } from './post.service';
import { Auth, AuthUser } from 'src/app.decorator';
import { User } from 'src/user/user.entity';
import { PostEntity } from './post.entity';
import { CreatePostTypeDto } from './dto/create-post-type.dto';
import { GetPostDto } from './dto/get-post.dto';

@Controller('post')
export class PostController {
    constructor(private readonly postService: PostService) {}

    /** 隐藏post中的无用字段 */
    private _exposePost(post: PostEntity) {
        const { user, type } = post;
        return {
            ...post,
            user: {
                id: user.id,
                username: user.username,
            },
            type: type && {
                id: type.id,
                name: type.name,
            },
        };
    }

    @Get()
    async getPosts(@Query() query: GetPostDto) {
        let vo: any;
        if (query.typeId) {
            vo = {
                type: {
                    id: query.typeId,
                },
            };
        }
        const result = await this.postService.findPost(vo);
        return result.map(this._exposePost);
    }

    @Post()
    @Auth('ADMIN', 'SUPER_ADMIN')
    async createPost(@Body() body: CreatePostDto, @AuthUser() user: User) {
        const vo = {
            ...body,
            type: body.typeId && { id: body.typeId },
            user,
        };
        delete vo.typeId;
        const result = await this.postService.createPost(vo);
        return this._exposePost(result);
    }

    @Post('type')
    @Auth('ADMIN', 'SUPER_ADMIN')
    async createPostType(@Body() body: CreatePostTypeDto) {
        return this.postService.createPostType(body);
    }
}
