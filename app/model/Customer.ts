import { BaseDocument } from '../common/mongo.base';
import { Application } from 'egg';
import { defaultFieldsPlugin, withEnterprisePlugin } from '../common/mongo.plugin';
import { Schema } from 'mongoose';

export interface ICustomer extends BaseDocument {
  name?: string;
  gender?: string;
  birthday?: Date;
  wechat?: string;
  mobile?: string;
  contactAddress?: string;
  job?: string;
  contacts?: string[];
  introducer?: string; // 介绍人
  note?: string; // 备注
  integral?: number; // 积分
  idCard?:string; //身份证

  lastShopDate?: Date;
  lastOptometryDate?: Date;
  lastConsumptionAmount?: number;
  consumptionTotalAmount?: number;
  consumptionCount?: number;

  // optometry?:string; 
}

export default (app: Application) => {
  const { mongoose } = app;

  const CustomerSchema = new mongoose.Schema({
    name: { type: Schema.Types.String, required: true },
    gender: { type: Schema.Types.String, required: true },
    birthday: { type: Schema.Types.Date, required: false },
    wechat: { type: Schema.Types.String, required: false },
    mobile: { type: Schema.Types.String, required: false },
    contactAddress: { type: Schema.Types.String, required: false },
    job: { type: Schema.Types.String, required: false },
    contacts: { type: Schema.Types.String, required: false },
    introducer: { type: Schema.Types.String, required: false },
    note: { type: Schema.Types.String, required: false },
    integral: { type: Schema.Types.Number, required: false },
    idCard: { type: Schema.Types.String, required: false },

    lastShopDate: { type: Schema.Types.String, required: false },
    lastOptometryDate: { type: Schema.Types.String, required: false },
    lastConsumptionAmount: { type: Schema.Types.Number, required: false },
    consumptionTotalAmount: { type: Schema.Types.Number, required: false },
    consumptionCount: { type: Schema.Types.Number, required: false },
  });

  CustomerSchema.plugin(defaultFieldsPlugin);
  CustomerSchema.plugin(withEnterprisePlugin);

  return mongoose.model<ICustomer>('Customer', CustomerSchema);
}
