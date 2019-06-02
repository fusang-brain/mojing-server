import { Application } from 'egg';
import { BaseDocument } from '../common/mongo.base';
import { IProduct } from './Product';
import { IProductionBatch } from './ProductionBatch';
import { Schema } from 'mongoose';
import { defaultFieldsPlugin, withEnterprisePlugin } from '../common/mongo.plugin';

export interface IProductStock extends BaseDocument {
  productID?:ObjectID;
  productBatchID?:ObjectID;
  productInfo?:IProduct; // 产品信息
  productBatchInfo?:IProductionBatch; // 批次信息
  total?:number;
}

export default (app: Application) => {
  const { mongoose } = app;

  const ProductStockSchema = new mongoose.Schema({
    productID: { type: Schema.Types.ObjectId, required: true },
    productBatchID: { type: Schema.Types.ObjectId, required: false },
    total: { type: Schema.Types.Number },
  }, {
    toJSON: {
      virtuals: true,
    }
  });

  ProductStockSchema.plugin(defaultFieldsPlugin);
  ProductStockSchema.plugin(withEnterprisePlugin);

  ProductStockSchema.virtual('productInfo', {
    ref: 'Product',
    localField: 'productID',
    foreignField: '_id',
    justOne: true // set true for one-to-one relationship
  });

  ProductStockSchema.virtual('productBatchInfo', {
    ref: 'ProductionBatch',
    localField: 'productBatchID',
    foreignField: '_id',
    justOne: true // set true for one-to-one relationship
  });

  return mongoose.model<IProductStock>('ProductStock', ProductStockSchema);
}