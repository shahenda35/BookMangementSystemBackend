import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

@Schema()
export class Book extends Document {
  @Prop({ required: true })
  title: string;
  @Prop({ required: true })
  author: string;
  @Prop({ required: true })
  publishedDate: Date;
  @Prop({ required: false })
  briefDescription: string;
}

export const BookSchema = SchemaFactory.createForClass(Book);
