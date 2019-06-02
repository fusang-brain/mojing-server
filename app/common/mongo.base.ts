
import { Document } from 'mongoose';

export interface WithEnterprise {
  enterprise?:ObjectID;
}

export interface BaseDocument extends SimpleDocument,WithEnterprise {}

export interface SimpleDocument extends Document {
  deleted?:boolean;
  updatedAt?:Date;
  createdAt?:Date;
  [key: string]: any;
}

export interface Condition {
  _id?: ObjectID;
  deleted?:boolean;
  updatedAt?:Date;
  createdAt?:Date;
  [key: string]: any;
}