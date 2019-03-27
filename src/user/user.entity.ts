/**
 * ORM User实体
 * @author wsq
 * @email `wsq961@outlook.com`
 */
import { Entity, Column, OneToMany } from 'typeorm';
import { AppEntity } from '../app.entity';
import { Exclude } from 'class-transformer';
import { PostEntity } from '../post/post.entity';
@Entity()
export class User extends AppEntity {
    @Column({
        length: 20,
        unique: true,
    })
    username: string;

    @Exclude()
    @Column({
        length: 256,
    })
    password: string;

    @Column()
    nickName: string;

    @Column({
        enum: [0, 1],
    })
    gender: number;

    @Column({
        unique: true,
    })
    mobile: string;

    @Column({
        nullable: true,
    })
    wechat: string;

    @Column({
        nullable: true,
    })
    qq: string;

    @Column({
        type: 'timestamp',
        nullable: true,
    })
    intendedAt: Date;

    @Column({
        type: 'timestamp',
        nullable: true,
    })
    gradutedAt: Date;

    @Column({
        nullable: true,
        length: 200,
    })
    remark: string;

    @Column({
        nullable: true,
    })
    photo: string;

    @Column({
        enum: ['SUPER_ADMIN', 'ADMIN', 'PUBLIC'],
        default: 'PUBLIC',
    })
    role: string;

    @OneToMany(type => PostEntity, post => post.user)
    posts: PostEntity[];
}
