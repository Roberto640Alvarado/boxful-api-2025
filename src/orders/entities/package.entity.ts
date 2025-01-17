import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type PackageDocument = Package & Document;

@Schema({ timestamps: true })
export class Package {
  @Prop({ required: true })
  length: number; 

  @Prop({ required: true })
  width: number; 

  @Prop({ required: true })
  height: number; 

  @Prop({ required: true })
  weight: number;

  @Prop({ required: true })
  content: string; 
}

export const PackageSchema = SchemaFactory.createForClass(Package);
