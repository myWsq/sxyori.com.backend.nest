/**
 * 创建User的数据类型
 * @author wsq
 * @email wsq961@outlook.com
 */
export interface CreateUserVo {
    username: string;
    password: string;
    nickName: string;
    mobile: string;
    gender: number;
    role ?: 'ADMIN' | 'SUPER_ADMIN' | 'PUBLIC';
}
