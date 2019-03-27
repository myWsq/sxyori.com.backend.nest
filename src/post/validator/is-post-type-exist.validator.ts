/**
 * 验证器 检查文章类型是否存在
 * @author wsq
 * @email `wsq961@outlook.com`
 */

import {
    ValidatorConstraintInterface,
    ValidationArguments,
    ValidatorConstraint,
} from 'class-validator';
import { PostType } from '../post-type.entity';

@ValidatorConstraint({ async: true })
export class IsPostTypeExist implements ValidatorConstraintInterface {
    async validate(id: number | string, args: ValidationArguments) {
        return parseInt(id.toString(), 10) && !!(await PostType.findOne(id));
    }
    defaultMessage(args: ValidationArguments) {
        return `Post type ${args.value} does not exist`;
    }
}
