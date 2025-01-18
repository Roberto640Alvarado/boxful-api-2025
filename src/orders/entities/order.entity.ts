import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';
import { Package } from './package.entity';

export type OrderDocument = Order & Document;

@Schema({ timestamps: true })
export class Order {
  @Prop({ required: true })
  pickupAddress: string;

  @Prop({ required: true })
  scheduledDate: String;

  @Prop({ required: true })
  firstName: string;

  @Prop({ required: true })
  lastName: string; 

  @Prop({ required: true })
  email: string; 

  @Prop({ required: true })
  phone: string; 

  @Prop({ required: true })
  recipientAddress: string; 

  @Prop({ required: true })
  department: string; 

  @Prop({ required: true })
  municipality: string; 

  @Prop({ required: true })
  referencePoint: string; 

  @Prop({ required: false })
  instructions?: string; 

  @Prop({ type: [{ type: Types.ObjectId, ref: 'Package' }] })
  packages: Package[]; 
}

export const OrderSchema = SchemaFactory.createForClass(Order);

