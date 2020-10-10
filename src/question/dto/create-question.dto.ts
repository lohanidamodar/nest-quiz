import { IsArray, IsNotEmpty, IsString } from "class-validator";

export class CreateQuestionDto {
    @IsNotEmpty()
    question: string;

    @IsNotEmpty()
    @IsArray()
    options: string[];

    @IsNotEmpty()
    answer: string;

    @IsNotEmpty()
    categoryId: string;
}