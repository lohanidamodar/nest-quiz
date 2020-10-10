import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { CategoryModule } from './category/category.module';
import * as config from 'config';
const db: any = config.get('db');

@Module({
  imports: [MongooseModule.forRoot(db.uri), CategoryModule],
  controllers: [],
  providers: [],
})
export class AppModule { }
