import { Application } from 'egg';
import { Schema } from 'mongoose'
import { defaultFieldsPlugin, withEnterprisePlugin } from '../common/mongo.plugin';
import { SimpleDocument } from '../common/mongo.base';

export interface IUser extends SimpleDocument {
  username?:string;
  realname:string;
  enterprises:Array<ObjectID>;
  email?:string;
  phone?:string;
}

export default (app: Application)  => {
  const mongoose = app.mongoose;

  const UserSchema = new mongoose.Schema({
    username: { type: Schema.Types.String },
    realname: { type: Schema.Types.String },
    password: Schema.Types.String,
    email: Schema.Types.String,
    phone: Schema.Types.String,
    enterprises: [{ type: Schema.Types.ObjectId, ref: 'Enterprise' }],
  });

  UserSchema.plugin(defaultFieldsPlugin);
  UserSchema.plugin(withEnterprisePlugin);

  return mongoose.model<IUser>('User', UserSchema);
}