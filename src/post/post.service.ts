import { Injectable } from '@nestjs/common';
import { PostEntity } from './post.entity';

@Injectable()
export class PostService {
    createPost(vo: Partial<PostEntity>) {
        return PostEntity.create(vo).save();
    }
}
