/**
 * 课程Id 数据传输类型
 * @author wsq
 * @email `wsq961@outlook.com`
 */
import { Validate } from 'class-validator';
import { IsCourseExist } from '../validator/is-course-exist.validator';

export class CourseIdDto {
    @Validate(IsCourseExist)
    id: number;
}
