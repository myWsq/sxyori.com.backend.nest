/**
 * @author wsq
 * @email `wsq961@outlook.com`
 */
import { Entity, Column, ManyToMany, JoinTable } from 'typeorm';
import { AppEntity } from '../app.entity';
import { Teacher } from '../teacher/teacher.entity';

@Entity()
export class Course extends AppEntity {
    @Column()
    name: string;
    @Column()
    img: string;
    @Column()
    introduction: string;
    @ManyToMany(type => Teacher, {
        nullable: true,
    })
    @JoinTable()
    teachers: Teacher[];
    @Column()
    isShow: boolean;
}
