import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { UserModule } from './users/users.modules';
import { PostsModule } from './posts/posts.module';
import { AuthModule } from './auth/auth.module';
// import * as dotenv from 'dotenv';
import { ConfigModule } from '@nestjs/config';
// dotenv.config({ path: process.cwd() + `/.env.${process.env.NODE_ENV}` });

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true, // 👈 makes env available in all modules
      envFilePath: [`.env.${process.env.NODE_ENV}`, '.env'], // fallback
    }),
    MongooseModule.forRoot(process.env.MONGODB_URI!),
    UserModule,
    PostsModule,
    AuthModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
