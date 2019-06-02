import { BaseDocument } from '../common/mongo.base';
import { Application } from 'egg';
import { Schema } from 'mongoose';
import { defaultFieldsPlugin } from '../common/mongo.plugin';

export const LOCAL_PROVIDER = 'meYup';

export interface IAuthorization extends BaseDocument {
  provider:string; // like github, wechat, meYup
  provider_id:string; // provider unique id
  password?:string;
  user_id:ObjectID; // linked user
}

export default (app: Application) => {
  const { mongoose } = app;

  const AuthorizationSchema = new mongoose.Schema({
    provider: { type: Schema.Types.String, required: true },
    provider_id: { type: Schema.Types.String, required: true },
    password: Schema.Types.String,
    user_id: { type: Schema.Types.ObjectId, required: true },
  });

  AuthorizationSchema.plugin(defaultFieldsPlugin);

  return mongoose.model<IAuthorization>('Authorization', AuthorizationSchema);
}