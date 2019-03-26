import { IsOptional, Validate, IsNumberString } from 'class-validator';
import { IsPostTypeExist } from '../validator/is-post-type-exist.validator';

export class GetPostDto {
    @IsOptional()
    @IsNumberString()
    @Validate(IsPostTypeExist)
    typeId: number;
}
