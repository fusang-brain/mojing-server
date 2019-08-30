import { SimpleDocument } from '../common/mongo.base';
import { Application } from 'egg';
import { Schema } from 'mongoose';
import { defaultFieldsPlugin } from '../common/mongo.plugin';

export interface IEnterprise extends SimpleDocument {
  name:string; // 企业名称
  slug?:string; 
  logo?:string; // 企业logo
  address?:string; // 企业地址
  linkman?:string; // 企业联系人
  contactNumber?:string; // 联系电话
  businessLicense?:string; // 企业营业执照
  medicalEquipmentSalesLicense?:string; // 医疗许可证书
  description?:string; // 描述
  expiredAt?: Date; // 企业认证过期时间
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
    expiredAt: Schema.Types.Date,
  });

  EnterpriseSchema.plugin(defaultFieldsPlugin);
  return mongoose.model<IEnterprise>('Enterprise', EnterpriseSchema);
}