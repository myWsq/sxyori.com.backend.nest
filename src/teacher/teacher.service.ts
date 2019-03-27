/**
 * @author wsq
 * @email `wsq961@outlook.com`
 */
import { Injectable } from '@nestjs/common';
import { DeepPartial } from 'typeorm';
import { Teacher } from './teacher.entity';

@Injectable()
export class TeacherService {
    createTeacher(vo: DeepPartial<Teacher>) {
        return Teacher.create(vo).save();
    }
    deleteTeacher(id: number) {
        return Teacher.delete(id);
    }
    updateTeacher(id: number, vo: DeepPartial<Teacher>) {
        return Teacher.update(id, vo);
    }
    findTeacher() {
        return Teacher.find();
    }
}
