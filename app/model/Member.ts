import { BaseDocument } from '../common/mongo.base';
import { Schema } from 'mongoose';
import { Application } from 'egg';
import { defaultFieldsPlugin } from '../common/mongo.plugin';

//App会员表
export interface IMember extends BaseDocument {
  memberName?: string; //显示名称
  phone?: string; //手机号
  headPortrait?: string; //头像
}

export default (app: Application) => {
  const mongoose = app.mongoose;

  const MemberSchema = new mongoose.Schema({
    memberName: { type: Schema.Types.String, required: true },
    phone: { type: Schema.Types.String, required: true },
    headPortrait: { type: Schema.Types.String, required: false },
  });

  MemberSchema.plugin(defaultFieldsPlugin);
  return mongoose.model<IMember>('Member', MemberSchema);
}