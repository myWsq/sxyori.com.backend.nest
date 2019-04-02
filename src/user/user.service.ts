/**
 * @author wsq
 * @email `wsq961@outlook.com`
 */
import { Injectable } from '@nestjs/common';
import { User } from './user.entity';
import { getRepository, DeepPartial } from 'typeorm';
import { CourseItem } from '../course/course-item.entity';
@Injectable()
export class UserService {
    async getAllUser() {
        return User.find();
    }
    async findOneUser(username: string) {
        return getRepository(User).findOne({
            where: {
                username,
            },
            cache: true,
        });
    }
    async findOneUserByMobile(mobile: string) {
        return User.findOne({
            where: {
                mobile,
            },
        });
    }
    createUser(vo: Partial<User>) {
        const user = User.create(vo);
        return user.save();
    }
    updateUser(id: number, vo: DeepPartial<User>) {
        return User.update(id, vo);
    }

    /**
     * 给用户置课
     * @param userId 要置课的用户id
     * @param courseId 要置入的课程
     * @param grade 成绩,可以为空
     */
    async setUserCourse(userId: number, courseId: number, grade?: number) {
        const user = {
            id: userId,
        };
        const course = {
            id: courseId,
        };
        const courseItem = await CourseItem.findOne({
            where: {
                user,
                course,
            },
        });
        if (courseItem) {
            courseItem.grade = grade;
            return courseItem.save();
        } else {
            return CourseItem.create({
                user,
                course,
                grade,
            }).save();
        }
    }

    /** 移除用户课程 */
    async removeUserCourse(userId: number, courseId: number) {
        const course = await CourseItem.findOne({
            where: {
                user: {
                    id: userId,
                },
                course: {
                    id: courseId,
                },
            },
        });
        return course && course.remove();
    }

    /** 查看用户课程 */
    async findUserCourse(userId: number) {
        return CourseItem.find({
            where: {
                user: {
                    id: userId,
                },
            },
        });
    }
}
