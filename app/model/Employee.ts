import { BaseDocument } from '../common/mongo.base';
import { Application } from 'egg';
import { IUser } from './User';
import { Schema } from 'mongoose';
import { defaultFieldsPlugin, withEnterprisePlugin } from '../common/mongo.plugin';

export interface IEmployee extends BaseDocument {
  user?: IUser|ObjectID;
  name?: string;
  // email?: string;
  job?: string;
}

export default (app: Application) => {
  const mongoose = app.mongoose;

  const EmployeeSchema = new mongoose.Schema({
    user: { type: Schema.Types.ObjectId, required: true, ref: 'User' },
    name: { type: Schema.Types.String, required: false },
    // email: { type: Schema.Types.String, required: false },
    job: { type: Schema.Types.String, required: false },
  });

  EmployeeSchema.plugin(defaultFieldsPlugin);
  EmployeeSchema.plugin(withEnterprisePlugin);

  return mongoose.model<IEmployee>('Employee', EmployeeSchema);
}