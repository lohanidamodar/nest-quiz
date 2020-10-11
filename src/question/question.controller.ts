import { Body, Controller, Delete, Get, Param, Patch, Post, Query, ValidationPipe } from '@nestjs/common';
import { CreateQuestionDto } from './dto/create-question.dto';
import { GetQuestionsFilterDto } from './dto/get-questions-filter.dto';
import { Question } from './question.model';
import { QuestionService } from './question.service';

@Controller('questions')
export class QuestionController {
    constructor(private readonly questionService: QuestionService) {

    }

    @Get()
    getAll(@Query(ValidationPipe) filterDto: GetQuestionsFilterDto): Promise<Question[]> {
        return this.questionService.getAll(filterDto);
    }
    @Get('category/:id')
    getCategoryQuestions(@Param('id') categoryId: string) : Promise<Question[]> {
        return this.questionService.getCategoryQuestions(categoryId);
    }

    @Get(':id')
    getQuestion(@Param('id') id: string): Promise<Question> {
        return this.questionService.getById(id);
    }


    @Post()
    addQuestion(@Body(ValidationPipe) createQuestionDto: CreateQuestionDto): Promise<Question> {
        return this.questionService.addQuestion(createQuestionDto);
    }

    @Patch(':id')
    updateQuestion(@Param('id') id: string, @Body() createQuestionDto: CreateQuestionDto): Promise<Question> {
        return this.questionService.updateQuestion(id, createQuestionDto);
    }

    @Delete(':id')
    deleteQuestion(@Param('id') id: string): Promise<Question> {
        return this.questionService.deleteQuestion(id);
    }
}
