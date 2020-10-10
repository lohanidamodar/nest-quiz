import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { QuestionController } from './question.controller';
import { QuestionSchema } from './question.model';
import { QuestionService } from './question.service';

@Module({
  imports: [MongooseModule.forFeature([{ name: "Question", schema: QuestionSchema }])],
  controllers: [QuestionController],
  providers: [QuestionService]
})
export class QuestionModule { }
