import {
    ValidatorConstraint,
    ValidatorConstraintInterface,
    ValidationArguments,
} from 'class-validator';
import { Course } from '../course.entity';

/**
 * 检查课程是否存在 验证器
 * 可用于课程的任何字段
 * `@Validate(IsCourseExist)`
 * @author wsq
 * @email `wsq961@outlook.com`
 */

@ValidatorConstraint({ async: true })
export class IsCourseExist implements ValidatorConstraintInterface {
    async validate(value: any, args: ValidationArguments) {
        const course = await Course.findOne({
            where: {
                id: value,
            },
        });
        return !!course;
    }
    defaultMessage(args: ValidationArguments) {
        return `Course ${args.value} does not exist`;
    }
}
