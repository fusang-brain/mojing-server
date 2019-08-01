import { BaseDocument } from '../common/mongo.base';
import { Application } from 'egg';
import { Schema } from 'mongoose';
import { defaultFieldsPlugin, withEnterprisePlugin } from '../common/mongo.plugin';

// 权限组/角色组
export interface IAccessGroup extends BaseDocument {
  name?:string;
  kind?: ('system'|'enterprise');
}

export default (app: Application) => {
  const mongoose = app.mongoose;

  const AccessGroupSchema = new mongoose.Schema({
    name: { type: Schema.Types.String, required: true },
    kind: { type: Schema.Types.String, required: false },
  });

  AccessGroupSchema.plugin(defaultFieldsPlugin);
  AccessGroupSchema.plugin(withEnterprisePlugin);
  return mongoose.model<IAccessGroup>('AccessGroup', AccessGroupSchema);
}