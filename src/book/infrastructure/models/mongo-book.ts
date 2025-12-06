import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';

export type MongoBookDocument = HydratedDocument<MongoBook>;

@Schema({ collection: 'books', timestamps: true, versionKey: false })
export class MongoBook {
  @Prop({
    type: Number,
    required: true,
    unique: true,
    index: true,
  })
  id: number;

  @Prop({ required: true })
  title: string;

  @Prop({ required: true })
  author: string;

  @Prop({ 
    required: true,
    index: true,
  })
  isbn: string;

  @Prop({ required: true })
  costUsd: number;

  @Prop({ required: true })
  stockQuantity: number;

  @Prop({ required: true })
  category: string;

  @Prop({ required: true })
  supplierCountry: string;

  @Prop()
  sellingPriceLocal?: number;

  createdAt: Date;

  updatedAt?: Date;

}

export const BookSchema = SchemaFactory.createForClass(MongoBook);