/**
 * 全局中间件 将jwt解析为`User`添加至Request中
 * @author wsq
 * @email `wsq961@outlook.com`
 */
import {
    Injectable,
    NestMiddleware,
    UnauthorizedException,
} from '@nestjs/common';
import { UserService } from './user/user.service';
import { AuthService } from './auth/auth.service';

@Injectable()
export class AppMiddleware implements NestMiddleware {
    constructor(
        private readonly userService: UserService,
        private readonly authService: AuthService,
    ) {}
    async use(req: any, res: any, next: () => void) {
        const token = req.headers.authorization;
        if (token) {
            let payload: any;
            try {
                payload = this.authService.verifyJwt(token);
            } catch (e) {
                /** Jwt格式错误 */
                throw new UnauthorizedException();
            }
            const user = await this.userService.findOneUser(payload.username);
            req.user = user;
        }
        next();
    }
}
