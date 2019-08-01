import { BaseDocument } from '../common/mongo.base';
import { Application } from 'egg';
import { Schema } from 'mongoose';
import { defaultFieldsPlugin, withEnterprisePlugin } from '../common/mongo.plugin';
import { IAccess } from './Access';
import { IAccessGroup } from './AccessGroup';

// 权限组/角色组
export interface IAccessGroupRelate extends BaseDocument {
  accessGroup?: (string|IAccessGroup);
  access?: (string|IAccess);
}

export default (app: Application) => {
  const mongoose = app.mongoose;

  const AccessGroupRelateSchema = new mongoose.Schema({
    accessGroup: { type: Schema.Types.ObjectId, required: true, ref: 'AccessGroup' },
    access: { type: Schema.Types.ObjectId, required: true, ref: 'Access' },
  });

  AccessGroupRelateSchema.plugin(defaultFieldsPlugin);
  AccessGroupRelateSchema.plugin(withEnterprisePlugin);
  return mongoose.model<IAccessGroupRelate>('AccessGroupRelate', AccessGroupRelateSchema);
}