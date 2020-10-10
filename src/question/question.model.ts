import * as mongoose from 'mongoose';

export const QuestionSchema = new mongoose.Schema({
    question: { type: String, required: true },
    options: { type: [String], required: false },
    answer: { type: String, required: true },
    categoryId: { type: String, required: true },
});

export interface Question extends mongoose.Document {
    id?: string,
    question: string,
    options: string[],
    answer: string,
    categoryId: string,
}