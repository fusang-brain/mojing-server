import { BaseDocument } from '../common/mongo.base';
import { Application } from 'egg';
import { Schema } from 'mongoose';
import { defaultFieldsPlugin, withEnterprisePlugin } from '../common/mongo.plugin';
import { IProduct } from './Product';

export interface IProductionBatch extends BaseDocument {
  batchNumber:string;
  diopter?:string;
  BOZR?:string; // 基弧
  diameter?:string; // 直径
  color?:string; // 颜色
  startDate?:string; // 开始日期
  expirationDate?:string; // 失效日期
  productID: ObjectID;
  product?:IProduct;
}

export default (app: Application) => {
  const { mongoose } = app;

  const ProductionBatchSchem = new mongoose.Schema({
    batchNumber: { type: Schema.Types.String, required: true },
    diopter: { type: Schema.Types.String, required: false },
    BOZR: Schema.Types.String,
    diameter: Schema.Types.String,
    color: Schema.Types.String,
    startDate: Schema.Types.String,
    expirationDate: Schema.Types.String,
    productID: { type: Schema.Types.ObjectId, ref: 'Product' },
  }, {
    toJSON: {
      virtuals: true,
    },
  });

  ProductionBatchSchem.plugin(defaultFieldsPlugin);
  ProductionBatchSchem.plugin(withEnterprisePlugin);

  ProductionBatchSchem.virtual('product', {
    ref: 'Product',
    localField: 'productID',
    foreignField: '_id',
    justOne: true,
  });

  return mongoose.model<IProductionBatch>('ProductionBatch', ProductionBatchSchem);
}