import { Injectable } from '@nestjs/common';
import { PostEntity } from './post.entity';
import { PostType } from './post-type.entity';
import { DeepPartial, FindConditions } from 'typeorm';

@Injectable()
export class PostService {
    createPost(vo: DeepPartial<PostEntity>) {
        return PostEntity.create(vo).save();
    }
    createPostType(vo: DeepPartial<PostType>) {
        return PostType.create(vo).save();
    }
    findPost(where?: FindConditions<PostEntity>) {
        return PostEntity.find({
            where,
            relations: ['user', 'type'],
        });
    }
}
