/**
 * 多对多记录实体 用于记录每个用户的每门课程的成绩
 * @author wsq
 * @email `wsq961@outlook.com`
 */
import { Entity, ManyToOne, Column } from 'typeorm';
import { AppEntity } from '../app.entity';
import { User } from '../user/user.entity';
import { Course } from './course.entity';

@Entity()
export class CourseItem extends AppEntity {
    @ManyToOne(type => User)
    user: User;
    @ManyToOne(type => Course, {
        eager: true,
    })
    course: Course;
    @Column({
        nullable: true,
    })
    grade: number;
}
