import { BaseDocument } from '../common/mongo.base';
import { Schema } from 'mongoose';
import { Application } from 'egg';
import { defaultFieldsPlugin } from '../common/mongo.plugin';

//App 会员密码表
export interface ICryptogram extends BaseDocument{
    provider:string;//like github ,wechat,meYup  授权认证提供方
    provider_id:string;// provider unique id    登录第三方ID
    password?:string;   //密码
    memberId:ObjectID; //linked member     会员ID
}

export default (app: Application) => {
    const { mongoose } = app;
  
    const ICryptogramSchema = new mongoose.Schema({
      provider: { type: Schema.Types.String, required: true },
      provider_id: { type: Schema.Types.String, required: false },
      password: Schema.Types.String,
      memberId: { type: Schema.Types.ObjectId, required: true, ref: 'Member' },
    });
  
    ICryptogramSchema.plugin(defaultFieldsPlugin);
  
    return mongoose.model<ICryptogram>('Cryptogram', ICryptogramSchema);
  }