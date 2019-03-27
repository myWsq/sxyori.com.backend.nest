import { Validate } from 'class-validator';
import { IsTeacherExist } from '../validator/is-teacher-exist.validator';

export class ValidateTeacherIdDto {
    @Validate(IsTeacherExist)
    id: number;
}
