import { BaseDocument } from '../common/mongo.base';
import { IUser } from './User';
import { IRole } from './Role';
import { Application } from 'egg';
import { Schema } from 'mongoose';
import { defaultFieldsPlugin, withEnterprisePlugin } from '../common/mongo.plugin';

export interface IUserRole extends BaseDocument {
  user?: string;
  role?: string;
  userInfo?: IUser;
  roleInfo?: IRole;
}

export default (app: Application) => {
  const mongoose = app.mongoose;

  const UserRoleSchema = new mongoose.Schema({
    user: { type: Schema.Types.ObjectId, required: true },
    role: { type: Schema.Types.ObjectId, required: true },
  });

  UserRoleSchema.plugin(defaultFieldsPlugin);
  UserRoleSchema.plugin(withEnterprisePlugin);
  UserRoleSchema.virtual('userInfo', {
    ref: 'User',
    localField: 'user',
    foreignField: '_id',
    justOne: true,
  });
  UserRoleSchema.virtual('roleInfo', {
    ref: 'Role',
    localField: 'role',
    foreignField: '_id',
    justOne: true,
  });

  return mongoose.model<IUserRole>('UserRole', UserRoleSchema);
}