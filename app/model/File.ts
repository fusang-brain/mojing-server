import { SimpleDocument } from '../common/mongo.base';
import { Application } from 'egg';
import { Schema } from 'mongoose';
import { defaultFieldsPlugin } from '../common/mongo.plugin';

export interface IFile extends SimpleDocument {
  filename?: string; // 文件名
  absFilename?: string; // 文件的绝对路径名
  originalFilename?: string; // 文件的原始名称
  sign?: string; // 文件签名
}

export default (app: Application) => {
  const { mongoose } = app;
  const FileSchema = new mongoose.Schema({
    filename: { type: Schema.Types.String, required: true },
    absFilename: { type: Schema.Types.String, required: false },
    originalFilename: { type: Schema.Types.String, required: true },
    sign: { type: Schema.Types.String, required: true },
  }, {
    toJSON: {
      virtuals: true,
    },
  });

  FileSchema.plugin(defaultFieldsPlugin);

  // web 访问的相对地址
  FileSchema.virtual('lookpath').get(function() {
    return `${this.filename}`.replace('app', '');
  });
  
  return mongoose.model<IFile>('File', FileSchema);
}