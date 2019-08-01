import { BaseDocument } from '../common/mongo.base';
// import { IRole } from './Role';
import { Application } from 'egg';
import { Schema } from 'mongoose';
import { defaultFieldsPlugin, withEnterprisePlugin } from '../common/mongo.plugin';
import { IAccessGroup } from './AccessGroup';
import { IEmployee } from './Employee';

export interface IEmployeeAccess extends BaseDocument {
  employee?: (string|IEmployee);
  accessGroup?: (string|IAccessGroup);
}

export default (app: Application) => {
  const mongoose = app.mongoose;

  const EmployeeAccessSchema = new mongoose.Schema({
    employee: { type: Schema.Types.ObjectId, required: true, ref: 'Employee' },
    accessGroup: { type: Schema.Types.ObjectId, required: true, ref: 'AccessGroup' },
  }, {
    toJSON: {
      virtuals: true,
    },
  });

  EmployeeAccessSchema.plugin(defaultFieldsPlugin);
  EmployeeAccessSchema.plugin(withEnterprisePlugin);

  return mongoose.model<IEmployeeAccess>('EmployeeAccess', EmployeeAccessSchema);
}