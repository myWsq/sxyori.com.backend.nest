/**
 * @author wsq
 * @email `wsq961@outlook.com`
 */
import { Injectable } from '@nestjs/common';
import { DeepPartial } from 'typeorm';
import { Course } from './course.entity';

@Injectable()
export class CourseService {
    createCourse(vo: DeepPartial<Course>) {
        return Course.create(vo).save();
    }

    findCourseWithTeacher() {
        return Course.find({
            relations: ['teachers'],
        });
    }

    async updateCourse(id: number, vo: DeepPartial<Course>) {
        const course = await Course.findOne(id);
        const newCourse = Course.merge(course, vo);
        return newCourse.save();
    }

    deleteCourse(id: number) {
        return Course.delete(id);
    }
}
