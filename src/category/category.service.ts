import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { create } from 'domain';
import { Model } from 'mongoose';
import { Category } from './category.model';
import { CreateCategoryDto } from './dto/create-category.dto';

@Injectable()
export class CategoryService {
    constructor(
        @InjectModel('Category')
        private readonly categoryModel: Model<Category>) { }

    async getAll(): Promise<Category[]> {
        const categories = await this.categoryModel.find().exec();
        return categories;
    }

    async getById(id: string): Promise<Category> {
        const category = await this.categoryModel.findById(id).exec();
        if (!category) {
            throw new NotFoundException(`Category with id ${id} was not found`)
        }
        return category;
    }

    async addCategory(createCategoryDto: CreateCategoryDto): Promise<Category> {
        const category = new this.categoryModel();
        category.title = createCategoryDto.title;
        category.description = createCategoryDto.description;
        await category.save();
        return category;
    }

    async updateCategory(id: string, createCategoryDto: CreateCategoryDto): Promise<Category> {
        const category = await this.getById(id);
        if (createCategoryDto.title) {
            category.title = createCategoryDto.title;
        }
        if (createCategoryDto.description) {
            category.description = createCategoryDto.description;
        }
        await category.save();
        return category;
    }

    async deleteCategory(id: string): Promise<Category> {
        const product = await this.categoryModel.findByIdAndRemove(id).exec();
        return product;
    }
}
