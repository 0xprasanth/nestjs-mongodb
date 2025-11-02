import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose from 'mongoose';

@Schema()
export class Post {
  @Prop({ required: true })
  title: string;

  @Prop({ required: true })
  contents: string;

  //   @Prop({type: mongoose.Schema.Types.ObjectId})
  //   userId: string
}

export const PostSchema = SchemaFactory.createForClass(Post);
