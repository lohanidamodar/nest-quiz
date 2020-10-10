import { Body, Controller, Delete, Get, Param, Patch, Post, ValidationPipe } from '@nestjs/common';
import { Category } from './category.model';
import { CategoryService } from './category.service';
import { CreateCategoryDto } from './dto/create-category.dto';

@Controller('categories')
export class CategoryController {
    constructor(private readonly categoryService: CategoryService) { }
    @Get()
    getAll(): Promise<Category[]> {
        return this.categoryService.getAll();
    }

    @Get(':id')
    getCategory(@Param('id') id: string): Promise<Category> {
        return this.categoryService.getById(id);
    }

    @Post()
    addCategory(@Body(ValidationPipe) createCategoryDto: CreateCategoryDto): Promise<Category> {
        return this.categoryService.addCategory(createCategoryDto);
    }

    @Patch(':id')
    updateCategory(@Param('id') id: string, @Body() createCategoryDto: CreateCategoryDto): Promise<Category> {
        return this.categoryService.updateCategory(id, createCategoryDto);
    }

    @Delete(':id')
    deleteCategory(@Param('id') id: string): Promise<Category> {
        return this.categoryService.deleteCategory(id);
    }
}
