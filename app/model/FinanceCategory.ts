import { Application } from 'egg';
import { Schema } from 'mongoose';
import { BaseDocument } from '../common/mongo.base';
import { defaultFieldsPlugin, withEnterprisePlugin } from '../common/mongo.plugin';
import { RuleOptions } from '../common/rules';


export interface IFinanceCategory extends BaseDocument {
  slug?:string;
  name?:string;
}

export const FinanceCategoryValidationRule: RuleOptions = {
  slug: 'string',
  name: {
    type: 'string',
    required: true,
  },
}

export default (app: Application) => {
  const { mongoose } = app;

  const FinanceCategorySchema = new mongoose.Schema({
    slug: Schema.Types.String,
    name: Schema.Types.String, 
  });

  FinanceCategorySchema.plugin(defaultFieldsPlugin);
  FinanceCategorySchema.plugin(withEnterprisePlugin);

  return mongoose.model<IFinanceCategory>('FinanceCategory', FinanceCategorySchema);
}