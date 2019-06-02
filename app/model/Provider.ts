import { Application } from 'egg';
import { BaseDocument } from '../common/mongo.base';
import { Schema } from 'mongoose';
import { defaultFieldsPlugin, withEnterprisePlugin } from '../common/mongo.plugin';

export interface IProvider extends BaseDocument {
  name?:string; // 公司全名
  slug?:string;
  contacts?:string;
  contactPhone?:string;
  address?:string;
  postcode?:string;// 邮编
  corporationTax?:string; // 税号
  bank?:string; // 开户银行
  note?:string; // 备注
}

export default (app: Application) => {
  const mongoose = app.mongoose;

  const ProviderSchema = new mongoose.Schema({
    name: { type: Schema.Types.String, required: true },
    slug: Schema.Types.String,
    contacts: Schema.Types.String,
    contactPhone: Schema.Types.String,
    address: Schema.Types.String,
    postcode: Schema.Types.String,
    corporationTax: Schema.Types.String,
    bank: { type: Schema.Types.String, required: false },
    note: Schema.Types.String,
  }, {
    toJSON: {
      virtuals: true,
    },
  });

  ProviderSchema.plugin(defaultFieldsPlugin);
  ProviderSchema.plugin(withEnterprisePlugin);

  return mongoose.model<IProvider>('Provider', ProviderSchema);
}