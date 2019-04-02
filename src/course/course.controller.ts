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
import { CourseService } from './course.service';
import { Auth } from '../app.decorator';
import { CreateCourseDto } from './dto/create-course.dto';
import { CourseIdDto } from './dto/course-id.dto';

@Controller('course')
export class CourseController {
    constructor(private readonly courseService: CourseService) {}
    @Get()
    @Auth('ADMIN', 'SUPER_ADMIN')
    getAllCourse() {
        return this.courseService.findCourseWithTeacher();
    }

    @Post()
    @Auth('ADMIN', 'SUPER_ADMIN')
    createCourse(@Body() createCourseDto: CreateCourseDto) {
        const { teachers } = createCourseDto;
        if (teachers) {
            createCourseDto.teachers = teachers.map(item => ({
                id: item,
            }));
        }
        return this.courseService.createCourse(createCourseDto);
    }

    @Put(':id')
    @Auth('ADMIN', 'SUPER_ADMIN')
    updateCourse(
        @Param() param: CourseIdDto,
        @Body() createCourseDto: CreateCourseDto,
    ) {
        const { teachers } = createCourseDto;
        if (teachers) {
            createCourseDto.teachers = teachers.map(item => ({
                id: item,
            }));
        }
        return this.courseService.updateCourse(param.id, createCourseDto);
    }

    @Delete(':id')
    @Auth('ADMIN', 'SUPER_ADMIN')
    deleteCourse(@Param() param: CourseIdDto) {
        return this.courseService.deleteCourse(param.id);
    }
}
