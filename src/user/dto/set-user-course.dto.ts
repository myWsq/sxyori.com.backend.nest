import { IsNumber, Max, Min, Validate, IsOptional, IsNotEmpty } from 'class-validator';
import { IsCourseExist } from '../../course/validator/is-course-exist.validator';

export class SetUserCourseDto {
    @Validate(IsCourseExist)
    @IsNotEmpty()
    courseId: number;
    @IsNumber()
    @Max(100)
    @Min(0)
    @IsOptional()
    grade: number;
}
