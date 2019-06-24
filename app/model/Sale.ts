import { BaseDocument } from '../common/mongo.base';
import { IProduct } from './Product';
import { Application } from 'egg';
import { Schema } from 'mongoose';
import { defaultFieldsPlugin, withEnterprisePlugin } from '../common/mongo.plugin';

export interface PaidRecord {
  date?: Date;
  amount?: Number;
  paidType?: number; // 支付类型: 0: 现金 1: 支付宝 2: 微信 3: 银联 4: 其他支付 5: 挂单
}

export interface ISale extends BaseDocument {
  customer?: string; // 销售顾客
  products?: Array<IProduct>; // 商品列表
  amount?: number; // 实际销售金额
  saleDate?: Date; // 销售日期
  state?: number; // 支付状态: 0: 待支付 1: 已支付 2: 交易完成 3: 未完成
  tradeType?: number; // 销售类型: 0: 普通 1: 预付款
  paidType?: number; // 支付类型: 0: 现金 1: 支付宝 2: 微信 3: 银联 4: 其他支付 
  arrears?: number; // 欠款
  paidRecords?: Array<PaidRecord>;
  productsCount?:Array<{id: ObjectID, count: number}>;
}

export default (app: Application) => {
  const mongoose = app.mongoose;

  const SaleSchema = new mongoose.Schema({
    customer: { type: Schema.Types.ObjectId, required: true, ref: 'Customer' },
    products: [{
      type: Schema.Types.ObjectId,
      required: true,
      ref: 'Product',
    }],
    productsCount: [
      {
        id: {
          type: Schema.Types.ObjectId,
        },
        count: {
          type: Schema.Types.Number,
        },
      },
    ],
    amount: { type: Schema.Types.Number, required: true },
    saleDate: { type: Schema.Types.Date, required: true },
    state: { type: Schema.Types.Number },
    paidType: { type: Schema.Types.Number },
    arrears: { type: Schema.Types.Number },
    paidRecords: [
      {
        date: { type: Schema.Types.Date },
        amount: { type: Schema.Types.Number },
        paidType: { type: Schema.Types.Number },
      },
    ],
  });

  SaleSchema.plugin(defaultFieldsPlugin);
  SaleSchema.plugin(withEnterprisePlugin);

  return mongoose.model<ISale>('Sale', SaleSchema);
}