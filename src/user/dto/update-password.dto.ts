import { Validate } from 'class-validator';
import { IsUserExist, IsPasswordCorrect } from '../../auth/auth.validator';
import { IsPasswordValid } from '../validator/is-password-valid.validator';

export class UpdatePasswordDto {
    @Validate(IsUserExist)
    username: string;
    @Validate(IsPasswordCorrect)
    oldPassword: string;
    @Validate(IsPasswordValid)
    newPassword: string;
}
