import { Schema } from 'mongoose';
import { Application } from 'egg';
import { BaseDocument } from '../common/mongo.base';
import { defaultFieldsPlugin, withEnterprisePlugin } from '../common/mongo.plugin';

export interface IFinance extends BaseDocument {
  kind?: number; // 0: 支出， 1: 收入
  amount?: number;
  operator?: string;
  date?: Date;
  category?: string;
}

export const FinanceValidationRule = {
  kind: {
    type: 'number',
    required: true,
  },
  amount: 'number',
  operator: 'string',
  category: 'string',
  enterprise: {
    type: 'string',
    required: true,
  },
};

export default (app: Application) => {
  const { mongoose } = app;

  const FinanceSchema = new mongoose.Schema({
    kind: { type: Schema.Types.Number, default: 0, required: true },
    amount: Schema.Types.Number,
    operator: { type: Schema.Types.String, ref: 'User' },
    date: { type: Schema.Types.Date, default: Date.now, required: true },
    category: Schema.Types.String,
  });

  FinanceSchema.plugin(defaultFieldsPlugin);
  FinanceSchema.plugin(withEnterprisePlugin);

  return mongoose.model<IFinance>('Finance', FinanceSchema);
}