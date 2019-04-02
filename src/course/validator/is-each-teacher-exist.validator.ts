import {
    ValidatorConstraint,
    ValidatorConstraintInterface,
    ValidationArguments,
} from 'class-validator';
import { Teacher } from '../../teacher/teacher.entity';
import { isNumber, isArray } from 'lodash';
/**
 * 检查数组中的教师id是否全部存在 验证器
 * `@Validate(IsEachTeacherExist)`
 * @author wsq
 * @email `wsq961@outlook.com`
 */

@ValidatorConstraint({ async: true })
export class IsEachTeacherExist implements ValidatorConstraintInterface {
    async validate(value: any[], args: ValidationArguments) {
        /** 如果有非number, 则直接跳过验证 */
        if (!isArray(value) || value.some(item => !isNumber(item))) {
            return true;
        }
        /** 组建异步数组 */
        const iterator = value.map(async item => ({
            id: item,
            count: await Teacher.count({
                where: {
                    id: item,
                },
            }),
        }));
        /** 异步迭代判断 */
        for await (const item of iterator) {
            if (!item.count) {
               return false;
            }
        }
        return true;
    }
    defaultMessage(args: ValidationArguments) {
        return `Some Teachers do not exist`;
    }
}
