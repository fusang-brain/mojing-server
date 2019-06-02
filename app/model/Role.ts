import { BaseDocument } from '../common/mongo.base';
import { IAccess } from './Access';
import { Application } from 'egg';
import { Schema } from 'mongoose';
import { defaultFieldsPlugin, withEnterprisePlugin } from '../common/mongo.plugin';

export interface IRole extends BaseDocument {
  rolename?: string;
  slug?:string;
  access?:IAccess[] | string[],
}

export default (app: Application) => {
  const mongoose = app.mongoose;

  const RoleSchema = new mongoose.Schema({
    rolename: { type: Schema.Types.String, required: true },
    slug: Schema.Types.String,
    access: [{ type: Schema.Types.ObjectId, ref: 'Access' }],
  });

  RoleSchema.plugin(defaultFieldsPlugin);
  RoleSchema.plugin(withEnterprisePlugin);

  return mongoose.model<IRole>('Role', RoleSchema);
}
