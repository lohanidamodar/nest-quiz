import { IsIn, IsNumber, IsNumberString, IsOptional, IsString } from "class-validator";

export class GetQuestionsFilterDto {
    @IsOptional()
    @IsString()
    categoryId: string;

    @IsOptional()
    @IsNumberString()
    limit: string;

    @IsOptional()
    @IsNumberString()
    offset: string;

    @IsOptional()
    @IsString()
    orderBy: string;

    @IsOptional()
    @IsIn(['asc','desc'])
    orderType: string;
}