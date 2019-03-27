/**
 * 教师 实体
 * @author wsq
 * @email wsq961@outlook.com
 */

import { AppEntity } from '../app.entity';
import { Entity, Column } from 'typeorm';

@Entity()
export class Teacher extends AppEntity {
    @Column()
    name: string;
    @Column()
    introduction: string;
    @Column()
    img: string;
    @Column({
        default: false,
    })
    isShow: boolean;
}
