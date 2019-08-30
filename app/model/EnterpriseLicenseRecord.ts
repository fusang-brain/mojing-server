import { SimpleDocument } from '../common/mongo.base';
import { IEnterprise } from './Enterprise';
import { Application } from 'egg';
import { Schema } from 'mongoose';
import { defaultFieldsPlugin } from '../common/mongo.plugin';

export interface IEnterpriseLicenseRecord extends SimpleDocument {
  orderNO?: string;
  enterprise?: (IEnterprise|string);
  money?: number;
  dataline?: string; // 1 year 一年, 1 days 一天, 1 month 一个月
  // payment?: string; // 支付记录
}

export default (app: Application) => {
  const { mongoose } = app;
  const EnterpriseLicenseRecordSchema = new mongoose.Schema({
    orderNO: { type: Schema.Types.String, required: true },
    enterprise: { type: Schema.Types.ObjectId, required: true, ref: 'Enterprise'},
    money: { type: Schema.Types.Number, required: false },
    dataline: { type: Schema.Types.String },
  });

  EnterpriseLicenseRecordSchema.plugin(defaultFieldsPlugin);
  return mongoose.model<IEnterpriseLicenseRecord>('EnterpriseLicenseRecord', EnterpriseLicenseRecordSchema);
}
