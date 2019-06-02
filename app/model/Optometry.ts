import { BaseDocument } from '../common/mongo.base';
import { Schema } from 'mongoose';
import { defaultFieldsPlugin, withEnterprisePlugin } from '../common/mongo.plugin';
import { Application } from 'egg';

type OptometryItem = {
  left?:string;
  right?:string;
}

type PDItem = {
  left?:string;
  right?:string;
}

export interface Optometry extends BaseDocument {
  SPH?:OptometryItem; // 球镜
  CYL?:OptometryItem; // 柱镜
  axial?:OptometryItem; // 轴向
  PD?:PDItem; // 瞳距
  totalPD?:string; // 总瞳距
  CVA?:OptometryItem; // 矫正视力
  PH?:string; // 瞳高
  DominantEye?:string; // 主视眼
  BasicVision?: OptometryItem; // 裸眼视力
  NearEye?: string; // 近用眼位
  FarEye?: string; // 远用眼位
  NRA?:string;
  PRA?:string;
  AC_A?:string; // AC/A
  SimultaneousVision?: string; // 同时视
  FusionFunction?:string; // 融合视
  StereoscopicVision?:string //  立体视
  ADD?:OptometryItem; // 下加光
  optometryNote?:string; // 备注
  customerID?: string; // 关联的客户ID
  optometryPerson?: string; // 验光师
  optometryDate?: Date; // 
}

export default (app: Application) => {
  const { mongoose } = app;

  const OptometrySchema = new mongoose.Schema({
    SPH: {
      left: { type: Schema.Types.String, required: false },
      right: { type: Schema.Types.String, required: false },
    },
    CYL: {
      left: { type: Schema.Types.String, required: false },
      right: { type: Schema.Types.String, required: false },
    },
    axial: {
      left: { type: Schema.Types.String, required: false },
      right: { type: Schema.Types.String, required: false },
    },
    PD: {
      left: { type: Schema.Types.String, required: false },
      right: { type: Schema.Types.String, required: false },
    },
    totalPD: { type: Schema.Types.String, required: false },
    CVA: {
      left: { type: Schema.Types.String, required: false },
      right: { type: Schema.Types.String, required: false },
    },
    ADD: {
      left: { type: Schema.Types.String, required: false },
      right: { type: Schema.Types.String, required: false },
    },
    BasicVision: {
      left: { type: Schema.Types.String, required: false },
      right: { type: Schema.Types.String, required: false },
    },
    PH: { type: Schema.Types.String, required: false },
    DominantEye: { type: Schema.Types.String, required: false },
    NearEye: { type: Schema.Types.String, required: false },
    FarEye: { type: Schema.Types.String, required: false },
    NRA: { type: Schema.Types.String, required: false },
    PRA: { type: Schema.Types.String, required: false },
    AC_A: { type: Schema.Types.String, required: false },
    SimultaneousVision: { type: Schema.Types.String, required: false },
    FusionFunction: { type: Schema.Types.String, required: false },
    StereoscopicVision: { type: Schema.Types.String, required: false },
    optometryNote: { type: Schema.Types.String, required: false },
    customerID: { type: Schema.Types.ObjectId, required: false },
    optometryPerson: { type: Schema.Types.ObjectId, required: false },
    optometryDate: { type: Schema.Types.Date, required: false },
  }, {
    toJSON: {
      virtuals: true,
    }
  });

  OptometrySchema.plugin(defaultFieldsPlugin);
  OptometrySchema.plugin(withEnterprisePlugin);

  OptometrySchema.virtual('optometryPersonInfo', {
    ref: 'User',
    localField: 'optometryPerson',
    foreignField: '_id',
    justOne: true // set true for one-to-one relationship
  });

  OptometrySchema.virtual('customer', {
    ref: 'Customer',
    localField: 'customerID',
    foreignField: '_id',
    justOne: true // set true for one-to-one relationship
  });

  return mongoose.model<Optometry>('Optometry', OptometrySchema);
}