import {
    ValidatorConstraint,
    ValidatorConstraintInterface,
    ValidationArguments,
} from 'class-validator';

/**
 * 用户密码是否符合规范 - 验证器
 * 8-16位, 至少包含一个字母和数字
 * @author wsq
 * @email `wsq961@outlook.com`
 */
@ValidatorConstraint()
export class IsPasswordValid implements ValidatorConstraintInterface {
    validate(value: any, arg: ValidationArguments) {
        return /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,16}$/.test(value);
    }
    defaultMessage() {
        return 'Minimum 8 and maximum 10 characters, at least one letter and one number';
    }
}
