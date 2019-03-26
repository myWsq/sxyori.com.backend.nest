/**
 * 文章实体
 * @author wsq
 * @email wsq961@outlook.com
 */

import { AppEntity } from '../app.entity';
import { Entity, Column, ManyToOne } from 'typeorm';
import { PostType } from './post-type.entity';

@Entity({
    name: 'post',
})
export class PostEntity extends AppEntity {
    @Column()
    title: string;
    @Column({
        nullable: true,
    })
    suTitle?: string;
    @Column({
        type: 'text',
        nullable: true,
    })
    content?: string;
    @Column({
        nullable: true,
    })
    img?: string;
    @Column({
        default: false,
    })
    isTop: boolean;
    @ManyToOne(type => PostType, type => type.posts)
    type: PostType;
}
