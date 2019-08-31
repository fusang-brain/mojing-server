import { Application } from 'egg';
import { BaseDocument } from '../common/mongo.base';
import { Schema } from 'mongoose';
import { defaultFieldsPlugin, withEnterprisePlugin } from '../common/mongo.plugin';
import { IProductionBatch } from './ProductionBatch';
import { IEnterprise } from './Enterprise';
import { RuleOptions } from '../common/rules';

export const CommonProductRules: RuleOptions = {
  kind: 'string',
  // enterprise: 'string',
  category: 'string',
  code: 'string',
  name: 'string',
  salePrice: 'number',
  unitPurchasePrice: 'number',
  manufacturers: {
    type: 'string',
    required: false,
  },
  provider: {
    type: 'string',
    required: false,
  },
  brand: {
    type: 'string',
    required: false,
  },
  typeSpecification: {
    type: 'string',
    required: false,
  },
  colorNumber: {
    type: 'string',
    required: false,
  },
  frameHeight: {
    type: 'string',
    required: false,
  },
  frameWidth: {
    type: 'string',
    required: false,
  },
  noseBridgeWeight: {
    type: 'string',
    required: false,
  },
  frameLegLength: {
    type: 'string',
    required: false,
  },
  frameWeight: {
    type: 'string',
    required: false,
  },
  diopter: {
    type: 'string',
    required: false,
  },
};

export const EyeglassProductRules: RuleOptions = {
  kind: 'string',
 // enterprise: 'string',
  // category:'string',
  code: 'string',
  name: 'string',
  salePrice: 'number',
  unitPurchasePrice: 'number',
  registerCode: {
    type: 'string',
    required: false,
  },
  manufacturers: {
    type: 'string',
    required: false,
  },
  provider: {
    type: 'string',
    required: false,
  },
  brand: {
    type: 'string',
    required: false,
  },
  unit: {
    type: 'string',
    required: false,
  },
  sphere: {
    type: 'string',
    required: false,
  },
  lenticularGrating: {
    type: 'string',
    required: false,
  },
  axialView: {
    type: 'string',
    required: false,
  },
  refractiveIndex: {
    type: 'string',
    required: false,
  },
  texture: {
    type: 'string',
    required: false,
  },
};

export const ContactLensesRules: RuleOptions = {
  kind: 'string',
  // enterprise: 'string',
  category: 'string',
  code: 'string',
  name: 'string',
  salePrice: 'number',
  unitPurchasePrice: 'number',
  manufacturers: {
    type: 'string',
    required: false,
  },
  provider: {
    type: 'string',
    required: false,
  },
  brand: {
    type: 'string',
    required: false,
  },
  productionBatch: {
    type: 'array',
    itemType: 'object',
    rule: {
      batchNumber: 'string',
      diopter: 'string',
      BOZR: 'string',
      diameter: 'string',
      color: 'string',
      startDate: 'string',
      expirationDate: 'string',
    },
  },
}

export const ServicesRules: RuleOptions = {
  kind: 'string',
  // enterprise: 'string',
  // registerCode:'string',
  code: 'string',
  name: 'string',
  salePrice: 'number',
  unitPurchasePrice: 'number',
  manufacturers: {
    type: 'string',
    required: false,
  },
  provider: {
    type: 'string',
    required: false,
  },
}

export interface IProduct extends BaseDocument {
  kind?: number; // 0: 普通商品 1: 光学镜片 2: 隐形眼镜 3: 服务项目
  category?: string; // 分类
  code: string; // 商品编码
  name: string; // 名称
  salePrice: number; // 售价
  unitPurchasePrice: number; // 单位进价
  manufacturers?: string; // 厂家
  provider?: string; // 供应商
  brand?: string; // 品牌
  typeSpecification?: string; // 型号
  colorNumber?: string; // 色号
  frameHeight?: string; // 框架长
  frameWidth?: string; // 框架宽
  noseBridgeWeight?: string; // 鼻梁宽
  frameLegLength?: string; // 镜腿长
  frameWeight?: string; // 镜架重量
  diopter?: string; // 屈光度

  // 镜片相关
  sphere?: string; // 球镜
  lenticularGrating?: string; // 柱镜
  axialView?: string; // 轴位
  refractiveIndex?: string; // 折射率
  texture?: string; // 材质

  unit?: string; // 计量单位
  registerCode?: string; // 注册证号

  productionBatch?: Array<IProductionBatch>;
  enterpriseInfo?: IEnterprise;
}

export default (app: Application) => {
  const { mongoose } = app;
  const ProductSchema = new mongoose.Schema({
    kind: { type: Schema.Types.String, required: true },
    category: { type: Schema.Types.String, required: false },
    code: { type: Schema.Types.String, required: true },
    name: { type: Schema.Types.String, required: true },
    salePrice: { type: Schema.Types.Number, required: true },
    unitPurchasePrice: { type: Schema.Types.Number, required: true },
    manufacturers: Schema.Types.String,
    provider: Schema.Types.String,
    brand: Schema.Types.String,
    typeSpecification: Schema.Types.String,
    colorNumber: Schema.Types.String,
    frameHeight: Schema.Types.String,
    frameWidth: Schema.Types.String,
    noseBridgeWeight: Schema.Types.String,
    frameLegLength: Schema.Types.String,
    frameWeight: Schema.Types.String,
    diopter: Schema.Types.String,

    sphere: Schema.Types.String,
    lenticularGrating: Schema.Types.String,
    axialView: Schema.Types.String,
    refractiveIndex: Schema.Types.String,
    texture: Schema.Types.String,

    unit: { type: Schema.Types.String, required: false },
    registerCode: { type: Schema.Types.String, required: false },
  }, {
    toJSON: {
      virtuals: true,
    }
  });

  ProductSchema.plugin(defaultFieldsPlugin);
  ProductSchema.plugin(withEnterprisePlugin);

  ProductSchema.virtual('productionBatch', {
    ref: 'ProductionBatch',
    localField: '_id',
    foreignField: 'productID',
    justOne: false // set true for one-to-one relationship
  });

  ProductSchema.virtual('enterpriseInfo', {
    ref: 'Enterprise',
    localField: 'enterprise',
    foreignField: '_id',
    justOne: true,
  });

  return mongoose.model<IProduct>('Product', ProductSchema);
}