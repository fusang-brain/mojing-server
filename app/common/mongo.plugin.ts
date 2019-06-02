import { Schema } from 'mongoose';
import { BaseDocument } from './mongo.base';

export function defaultFieldsPlugin(schema: Schema) {
  schema.add({
    deleted: { type: Schema.Types.Boolean, default: false },
    createdAt: { type: Schema.Types.Date, default: Date.now },
    updatedAt: { type: Schema.Types.Date, default: Date.now },
  });

  schema.pre('save', function (next) {
    (this as BaseDocument).updatedAt = new Date();
    next();
  });
}

export function withEnterprisePlugin(schema: Schema) {
  schema.add({
    enterprise: { type: Schema.Types.ObjectId },
  });
}