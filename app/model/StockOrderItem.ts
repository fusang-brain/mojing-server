import { Application } from 'egg';
import { BaseDocument } from '../common/mongo.base';
import { IProduct } from './Product';
import { IProductionBatch } from './ProductionBatch';
import { Schema } from 'mongoose';
import { defaultFieldsPlugin, withEnterprisePlugin } from '../common/mongo.plugin';

export interface IStockOrderItem extends BaseDocument {
  orderID?:ObjectID;
  productID?:ObjectID;
  productBatchID?:ObjectID;
  productInfo?:IProduct; // 产品信息
  productBatchInfo?:IProductionBatch; // 批次信息
  checkDate?:Date;
  total?:number;
  checkQualifiedCount?:number;
  checkResult?:string;
}

export default (app: Application) => {
  const { mongoose } = app;

  const StockOrderItemSchema = new mongoose.Schema({
    orderID: { type: Schema.Types.ObjectId, required: true },
    productID: { type: Schema.Types.ObjectId, required: true },
    productBatchID: { type: Schema.Types.ObjectId, required: false },
    checkDate: Schema.Types.Date,
    total: Schema.Types.Number,
    checkQualifiedCount: Schema.Types.Number,
    checkResult: Schema.Types.String,
  }, {
    toJSON: {
      virtuals: true,
    },
  });

  StockOrderItemSchema.plugin(defaultFieldsPlugin);
  StockOrderItemSchema.plugin(withEnterprisePlugin);
  StockOrderItemSchema.virtual('productInfo', {
    ref: 'Product',
    localField: 'productID',
    foreignField: '_id',
    justOne: true // set true for one-to-one relationship
  });

  StockOrderItemSchema.virtual('productBatchInfo', {
    ref: 'ProductionBatch',
    localField: 'productBatchID',
    foreignField: '_id',
    justOne: true // set true for one-to-one relationship
  });

  return mongoose.model<IStockOrderItem>('StockOrderItem', StockOrderItemSchema);
}