/**
 * 验证器 检查文章是否存在
 * @author wsq
 * @email wsq961@outlook.com
 */

import {
    ValidatorConstraintInterface,
    ValidationArguments,
    ValidatorConstraint,
} from 'class-validator';
import { PostEntity } from '../post.entity';

@ValidatorConstraint({ async: true })
export class IsPostExist implements ValidatorConstraintInterface {
    async validate(id: number | string, args: ValidationArguments) {
        return parseInt(id.toString(), 10) && !!(await PostEntity.findOne(id));
    }
    defaultMessage(args: ValidationArguments) {
        return `Post ${args.value} does not exist`;
    }
}
