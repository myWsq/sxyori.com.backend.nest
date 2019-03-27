/**
 * @author wsq
 * @email `wsq961@outlook.com`
 */
import {
    Controller,
    Get,
    Post,
    Body,
    Put,
    Param,
    Delete,
} from '@nestjs/common';
import { TeacherService } from './teacher.service';
import { CreateTeacherDto } from './dto/create-teacher.dto';
import { Auth } from '../app.decorator';
import { ValidateTeacherIdDto } from './dto/validate-teacher_id.dto';

@Controller('teacher')
export class TeacherController {
    constructor(private readonly teacherService: TeacherService) {}
    @Get()
    async getTeacherList() {
        return this.teacherService.findTeacher();
    }

    @Post()
    @Auth('ADMIN', 'SUPER_ADMIN')
    async createTeacher(@Body() body: CreateTeacherDto) {
        return this.teacherService.createTeacher(body);
    }

    @Put(':id')
    @Auth('ADMIN', 'SUPER_ADMIN')
    async updateTeacher(
        @Param() param: ValidateTeacherIdDto,
        @Body() body: CreateTeacherDto,
    ) {
        return this.teacherService.updateTeacher(param.id, body);
    }

    @Delete(':id')
    @Auth('ADMIN', 'SUPER_ADMIN')
    async deleteTeacher(@Param() param: ValidateTeacherIdDto) {
        return this.teacherService.deleteTeacher(param.id);
    }
}
