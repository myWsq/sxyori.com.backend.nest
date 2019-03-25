/**
 * 全局路由守卫
 * @author wsq
 * @email wsq961@outlook.com
 */
import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { Reflector } from '@nestjs/core';

@Injectable()
export class AppGuard implements CanActivate {
    constructor(private readonly meta: Reflector) {}
    async canActivate(context: ExecutionContext) {
        const req = context.switchToHttp().getRequest();
        const user = req.user;
        /** 检查是否被 `@Auth` 装饰器标记 */
        const roles = this.meta.get('auth', context.getHandler());
        if (roles instanceof Array) {
            return !!user && (!roles.length || roles.includes(user.role));
        } else {
            // 不需要鉴权
            return true;
        }
    }
}
