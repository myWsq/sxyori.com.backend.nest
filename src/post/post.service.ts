import { Injectable, Post } from '@nestjs/common';
import { PostEntity } from './post.entity';
import { PostType } from './post-type.entity';
import { DeepPartial, FindConditions, getConnection } from 'typeorm';

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
    deletePost(id: number) {
        return PostEntity.delete(id);
    }
    async deletePostType(id: number, cascade: boolean) {
        const posts = getConnection()
            .createQueryBuilder()
            .where('type = :id', { id });
        const postPromise = cascade
            ? posts
                  .delete()
                  .from(PostEntity)
                  .execute()
            : posts
                  .update(PostEntity)
                  .set({ type: null })
                  .execute();
        await postPromise;
        return PostType.delete(id);
    }
    async updatePost(id: number, vo: DeepPartial<PostEntity>) {
        return PostEntity.update(id, vo);
    }
}
