import { BaseDocument } from '../common/mongo.base';
import { Application } from 'egg';
import { Schema } from 'mongoose';
import { defaultFieldsPlugin } from '../common/mongo.plugin';

export interface IOrganization extends BaseDocument {
  name:string;
  slug?:string;
}

export default (app: Application) => {
  const { mongoose } = app;
  const OrganizationSchema = new mongoose.Schema({
    name: { type: Schema.Types.String, required: true },
    slug: Schema.Types.String,
  });

  OrganizationSchema.plugin(defaultFieldsPlugin);

  return mongoose.model<IOrganization>('Organization', OrganizationSchema);
}