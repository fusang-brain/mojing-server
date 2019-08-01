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
  }, {
    toJSON: {
      virtuals: true,
    },
  });

  UserSchema.plugin(defaultFieldsPlugin);
  UserSchema.plugin(withEnterprisePlugin);

  // UserSchema.virtual('UserRole', {
  //   ref: 'UserAccess',
  //   localField: '_id',
  //   foreignField: 'user',
  //   justOne: true // set true for one-to-one relationship
  // });

  return mongoose.model<IUser>('User', UserSchema);
}