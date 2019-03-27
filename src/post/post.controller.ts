/**
 * @author wsq
 * @email wsq961@outlook.com
 */
import {
    Controller,
    Body,
    Post,
    Get,
    Query,
    Param,
    Delete,
    Put,
} from '@nestjs/common';
import { CreatePostDto } from './dto/create-post.dto';
import { PostService } from './post.service';
import { Auth, AuthUser } from '../app.decorator';
import { User } from '../user/user.entity';
import { PostEntity } from './post.entity';
import { CreatePostTypeDto } from './dto/create-post-type.dto';
import { GetPostDto } from './dto/get-post.dto';
import { DeletePostDto } from './dto/delete-post.dto';
import { DeletePostTypeDto } from './dto/delete-post-type.dto';

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

    @Delete('type')
    @Auth('ADMIN', 'SUPER_ADMIN')
    async deletePostType(@Body() body: DeletePostTypeDto) {
        return this.postService.deletePostType(body.id, body.cascade);
    }

    @Put('type/:id')
    @Auth('ADMIN', 'SUPER_ADMIN')
    async updatePostType(
        @Param() param: DeletePostTypeDto,
        @Body() body: CreatePostTypeDto,
    ) {
        this.postService.updatePostType(param.id, body);
    }

    @Delete(':id')
    @Auth('ADMIN', 'SUPER_ADMIN')
    async deletePost(@Param() param: DeletePostDto) {
        this.postService.deletePost(param.id);
    }

    @Put(':id')
    @Auth('ADMIN', 'SUPER_ADMIN')
    async updatePost(
        @Body() body: CreatePostDto,
        @Param() param: DeletePostDto,
    ) {
        const vo = {
            ...body,
            type: body.typeId && { id: body.typeId },
        };
        delete vo.typeId;
        return this.postService.updatePost(param.id, vo);
    }
}
