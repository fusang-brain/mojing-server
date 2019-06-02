import { SimpleDocument } from '../common/mongo.base';
import { Application } from 'egg';
import { Schema } from 'mongoose';
import { defaultFieldsPlugin } from '../common/mongo.plugin';

export interface IAccess extends SimpleDocument {
  name?:string;
}

export default (app: Application) => {
  const mongoose = app.mongoose;

  const AccessSchema = new mongoose.Schema({
    name: { type: Schema.Types.String, required: true },
  });

  AccessSchema.plugin(defaultFieldsPlugin);
  return mongoose.model<IAccess>('Access', AccessSchema);
}