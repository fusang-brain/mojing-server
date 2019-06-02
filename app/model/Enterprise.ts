import { SimpleDocument } from '../common/mongo.base';
import { Application } from 'egg';
import { Schema } from 'mongoose';
import { defaultFieldsPlugin } from '../common/mongo.plugin';

export interface IEnterprise extends SimpleDocument {
  name:string;
  slug:string;
  logo?:string;
  address?:string;
  linkman?:string;
  contactNumber?:string;
  businessLicense?:string;
  medicalEquipmentSalesLicense?:string;
  description?:string;
}

export default (app: Application) => {
  const { mongoose } = app;
  const EnterpriseSchema = new mongoose.Schema({
    name: { type: Schema.Types.String, required: true },
    slug: { type: Schema.Types.String, required: true },
    logo: Schema.Types.String,
    address: Schema.Types.String,
    linkman: Schema.Types.String,
    contactNumber: Schema.Types.String,
    businessLicense: Schema.Types.String,
    medicalEquipmentSalesLicense: Schema.Types.String,
    description: Schema.Types.String,
  });

  EnterpriseSchema.plugin(defaultFieldsPlugin);
  return mongoose.model<IEnterprise>('Enterprise', EnterpriseSchema);
}