import { Body, Controller, Delete, Get, Param, Patch, Post, ValidationPipe } from '@nestjs/common';
import { CreateQuestionDto } from './dto/create-question.dto';
import { Question } from './question.model';
import { QuestionService } from './question.service';

@Controller('questions')
export class QuestionController {
    constructor(private readonly questionService: QuestionService) {

    }

    @Get()
    getAll(): Promise<Question[]> {
        return this.questionService.getAll();
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
