import { SimpleDocument } from "../common/mongo.base";
import { Application } from 'egg';
import { Schema } from 'mongoose';
import { defaultFieldsPlugin, withEnterprisePlugin } from '../common/mongo.plugin';

interface ILog extends SimpleDocument {
  name: string;
  date: Date;
  content: string;
}

export default (app: Application) => {
  const { mongoose } = app;
  const LogSchema = new mongoose.Schema({
    name: { type: Schema.Types.String, required: true },
    date: Schema.Types.Date,
    content: Schema.Types.String,
  });

  LogSchema.plugin(defaultFieldsPlugin);
  LogSchema.plugin(withEnterprisePlugin);
  return mongoose.model<ILog>('Log', LogSchema);
}