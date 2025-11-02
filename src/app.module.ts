import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import * as dotenv from 'dotenv';
import { UserModule } from './users/users.modules';
import { PostsModule } from './posts/posts.module';
dotenv.config({ path: process.cwd() + `/.env.${process.env.NODE_ENV}` });

@Module({
  imports: [
    MongooseModule.forRoot(process.env.MONGODB_URI!),
    UserModule,
    PostsModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
