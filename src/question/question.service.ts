import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CreateQuestionDto } from './dto/create-question.dto';
import { GetQuestionsFilterDto } from './dto/get-questions-filter.dto';
import { Question } from './question.model';

@Injectable()
export class QuestionService {
    constructor(
        @InjectModel('Question')
        private readonly questionModel: Model<Question>) {

    }
    async getAll(filterDto: GetQuestionsFilterDto): Promise<Question[]> {
        const query = this.questionModel.find();
        if (filterDto.categoryId) {
            query.where('categoryId').equals(filterDto.categoryId)
        }
        if (filterDto.offset) {
            query.skip(parseInt(filterDto.offset));
        }
        if (filterDto.limit) {
            query.limit(parseInt(filterDto.limit));
        }
        if (filterDto.orderBy && filterDto.orderType) {
            query.sort({ [filterDto.orderBy]: filterDto.orderType })
        }
        const categories = await query.exec();
        return categories;
    }

    async getById(id: string): Promise<Question> {
        const question = await this.questionModel.findById(id).exec();
        if (!question) {
            throw new NotFoundException(`Question with id ${id} was not found`)
        }
        return question;
    }

    async getCategoryQuestions(categoryId: string): Promise<Question[]> {
        return await this.questionModel.find({ 'categoryId': categoryId }).exec();
    }

    async addQuestion(createQuestionDto: CreateQuestionDto): Promise<Question> {
        const question = new this.questionModel();
        question.question = createQuestionDto.question;
        question.options = createQuestionDto.options;
        question.answer = createQuestionDto.answer;
        question.categoryId = createQuestionDto.categoryId;
        await question.save();
        return question;
    }

    async updateQuestion(id: string, createQuestionDto: CreateQuestionDto): Promise<Question> {
        const question = await this.getById(id);
        if (createQuestionDto.question) {
            question.question = createQuestionDto.question;
        }
        if (createQuestionDto.options) {
            question.options = createQuestionDto.options;
        }
        if (createQuestionDto.answer) {
            question.answer = createQuestionDto.answer;
        }
        if (createQuestionDto.categoryId) {
            question.categoryId = createQuestionDto.categoryId;
        }
        await question.save();
        return question;
    }

    async deleteQuestion(id: string): Promise<Question> {
        const product = await this.questionModel.findByIdAndRemove(id).exec();
        return product;
    }
}
