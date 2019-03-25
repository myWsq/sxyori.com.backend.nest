/**
 * ORM Entity 基类
 * @author wsq
 * @emial wsq961@outlook.com
 */
import {
    Entity,
    PrimaryGeneratedColumn,
    CreateDateColumn,
    UpdateDateColumn,
    BaseEntity,
} from 'typeorm';

@Entity()
export class AppEntity extends BaseEntity {
    @PrimaryGeneratedColumn() id: number; // 自动生成的id
    @CreateDateColumn() createdAt: Date; // 记录创建时间
    @UpdateDateColumn() updatedAt: Date; // 记录更新时间
}
