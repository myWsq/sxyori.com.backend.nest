import {
    ValidatorConstraint,
    ValidatorConstraintInterface,
    ValidationArguments,
} from 'class-validator';
import { Teacher } from '../teacher.entity';

/**
 * 检查教师是否存在 验证器
 * 可用于教师的任何字段
 * `@Validate(IsTeacherExist)`
 * @author wsq
 * @email `wsq961@outlook.com`
 */

@ValidatorConstraint({ async: true })
export class IsTeacherExist implements ValidatorConstraintInterface {
    async validate(value: any, args: ValidationArguments) {
        const teacher = await Teacher.findOne({
            where: {
                [args.property]: value,
            },
        });
        return !!teacher;
    }
    defaultMessage(args: ValidationArguments) {
        return `Teacher $value does not exist`;
    }
}
