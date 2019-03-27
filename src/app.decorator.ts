/**
 * 全局装饰器
 * @author wsq
 * @email `wsq961@outlook.com`
 */

import { SetMetadata, createParamDecorator } from '@nestjs/common';
/**
 * 为接口添加守卫
 * `@Auth()` or `@Auth('ADMIN','SUPER_ADMIN')`
 * @param args 可访问角色, 空表示已登录用户均可访问
 */
export const Auth = (...args: string[]) => SetMetadata('auth', args);

/**
 * 获取授权用户信息
 * `@AuthUser()`
 */
export const AuthUser = createParamDecorator((data, req) => {
    return req.user;
});
