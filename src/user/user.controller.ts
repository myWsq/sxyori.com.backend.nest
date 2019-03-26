/**
 * @author wsq
 * @email wsq961@outlook.com
 */
import {
    Controller,
    Get,
    Put,
    Body,
    UseInterceptors,
    ClassSerializerInterceptor,
} from '@nestjs/common';
import { UserService } from './user.service';
import * as bcrypt from 'bcrypt';
import { RegisterDto } from './dto/register.dto';
@Controller('user')
export class UserController {
    constructor(private readonly userService: UserService) {}
    @Get()
    async getAllUser() {
        return await this.userService.getAllUser();
    }
    @Put()
    @UseInterceptors(ClassSerializerInterceptor)
    async register(@Body() body: RegisterDto) {
        body.password = await bcrypt.hash(body.password, 3);
        return await this.userService.createUser(body);
    }
}
