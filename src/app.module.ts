import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import * as config from 'config';
const db: any = config.get('db');

@Module({
  imports: [MongooseModule.forRoot(db.uri)],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule { }
