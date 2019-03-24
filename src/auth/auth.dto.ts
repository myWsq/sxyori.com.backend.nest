/**
 * Auth 数据传输类型
 * @author wsq
 * @email wsq961@outlook.com
 */
export class LoginDto {
    username: string;
    password: string;
}

export class RegisterDto extends LoginDto {
    nickName: string;
    mobile: string;
    gender: number;
    role ?: 'ADMIN' | 'SUPER_ADMIN' | 'PUBLIC';
}
