import { AppEntity } from '../app.entity';
import { Entity, Column, OneToMany } from 'typeorm';
import { PostEntity } from './post.entity';

/**
 * 文章类型 实体
 * @author wsq
 * @email wsq961@outlook.com
 */

@Entity()
export class PostType extends AppEntity {
    @Column()
    name: string;
    @OneToMany(type => PostEntity, post => post.type)
    posts: PostEntity[];
}
