import * as mongoose from 'mongoose';

export const CategorySchema = new mongoose.Schema({
    title: { type: String, required: true },
    description: { type: String, required: false },
});

export interface Category extends mongoose.Document {
    id?: string,
    title: string,
    description: string,
}