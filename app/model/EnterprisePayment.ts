import { Application } from 'egg';
import { SimpleDocument } from '../common/mongo.base';
import { Schema } from 'mongoose';
import { defaultFieldsPlugin } from '../common/mongo.plugin';
import { IEnterpriseLicenseRecord } from './EnterpriseLicenseRecord';

export type PaymentMethod = ('alipay' | 'wechat' | 'unionpay'|'free'); // 付款方式 
export type PaymentState = ('wait'|'doing'|'paid') // wait: 待支付 doing: 进行中/汇款中 paid: 已付款

/**
 * 支付表
 */
export interface IEnterprisePayment extends SimpleDocument {
  method?: PaymentMethod;
  licenseRecord?: (string|IEnterpriseLicenseRecord);  //授权记录
  state?: PaymentState; //状态
}

export default (app: Application) => {
  const { mongoose } = app;

  const PaymentSchema = new mongoose.Schema({
    method: { type: Schema.Types.String, required: false },
    licenseRecord: { type: Schema.Types.ObjectId, ref: 'EnterpriseLicenseRecord'},
    state: { type: Schema.Types.String, required: true, default: 'wait' },
  });
  PaymentSchema.plugin(defaultFieldsPlugin);
  return mongoose.model<IEnterprisePayment>('EnterprisePayment', PaymentSchema);
}