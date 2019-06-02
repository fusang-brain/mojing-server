import { Application } from 'egg';
import { BaseDocument } from '../common/mongo.base';
import { IStockOrderItem } from './StockOrderItem';
import { Schema } from 'mongoose';
import { defaultFieldsPlugin, withEnterprisePlugin } from '../common/mongo.plugin';
import { IUser } from './User';

export interface IOutStockOrder extends BaseDocument {
  orderNO?:string;
  title?:string;
  outStockTime?:Date;
  provider?:string;
  customer?:string;
  checker?:ObjectID;
  stock?:string;
  note?:string;
  currentStep?:number;
  items?:Array<IStockOrderItem>;
  checkerObj?:IUser;
}

export default (app: Application) => {
  const { mongoose } = app;

  const StockOrderSchema = new mongoose.Schema({
    orderNO: Schema.Types.String,
    title: Schema.Types.String,
    outStockTime: Schema.Types.Date,
    provider: Schema.Types.String,
    customer: Schema.Types.String,
    checker: Schema.Types.String,
    stock: Schema.Types.String,
    currentStep: { type: Schema.Types.Number, default: 1 },
    note: Schema.Types.String,
  }, {
    toJSON: {
      virtuals: true,
    },
  });

  StockOrderSchema.plugin(defaultFieldsPlugin);
  StockOrderSchema.plugin(withEnterprisePlugin);
  StockOrderSchema.virtual('items', {
    ref: 'OutStockOrderItem',
    localField: '_id',
    foreignField: 'orderID',
    justOne: false // set true for one-to-one relationship
  });

  StockOrderSchema.virtual('checkerObj', {
    ref: 'User',
    localField: 'checker',
    foreignField: '_id',
    justOne: true,
  });

  return mongoose.model<IOutStockOrder>('OutStockOrder', StockOrderSchema);
}