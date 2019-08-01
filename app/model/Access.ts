import { SimpleDocument } from '../common/mongo.base';
import { Application } from 'egg';
import { Schema } from 'mongoose';
import { defaultFieldsPlugin } from '../common/mongo.plugin';

export interface IAccess extends SimpleDocument {
  subject: string; // 权限对象
  subjectName?: string; // 对象显示名称
  name:string; // 权限名称
  displayName?: string; // 权限显示名称
}

export default (app: Application) => {
  const mongoose = app.mongoose;

  const AccessSchema = new mongoose.Schema({
    subject: { type: Schema.Types.String, required: true },
    subjectName: { type: Schema.Types.String, required: true },
    name: { type: Schema.Types.String, required: true },
    displayName: { type: Schema.Types.String, required: false }, // 显示名称
  });

  AccessSchema.plugin(defaultFieldsPlugin);
  return mongoose.model<IAccess>('Access', AccessSchema);
}