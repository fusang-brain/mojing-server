import { Service } from 'egg';
import { IProductionBatch } from '../model/ProductionBatch';
import * as lodash from 'lodash';
import { pagedResultBuild } from '../common/query.model';
import { IProduct } from '../model/Product';
import { IProductStock } from '../model/ProductStock';

export interface ICommonProduct {
  kind:string;
  category:string;
  enterprise?:string;
  code:string;
  name:string; // 名称
  salePrice:number; // 售价
  unitPurchasePrice:number; // 单位进价
  manufacturers?:string; // 厂家
  provider?:string; // 供应商
  brand?:string; // 品牌
  typeSpecification?:string; // 型号
  colorNumber?:string; // 色号
  frameHeight?:number; // 框架长
  frameWidth?:number; // 框架宽
  noseBridgeWeight?:number; // 鼻梁宽
  frameLegLength?:number; // 镜腿长
  frameWeight?:number; // 镜架重量
  diopter?:number; // 屈光度
}

export interface IEyeglass {
  kind:string;
  category:string;
  enterprise?:string;
  code:string;
  name:string; // 名称
  salePrice:number; // 售价
  unitPurchasePrice:number; // 单位进价
  manufacturers?:string; // 厂家
  provider?:string; // 供应商
  brand?:string; // 品牌
  unit?:string; // 计量单位
  sphere?:string; // 球镜
  lenticularGrating?:string; // 柱镜
  axialView?:string; // 轴位
  refractiveIndex?:string; // 折射率
  texture?:string; // 材质
}

export interface IContactLenses {
  kind:string;
  category:string;
  enterprise?:string;
  code:string;
  name:string; // 名称
  salePrice:number; // 售价
  unitPurchasePrice:number; // 单位进价
  manufacturers?:string; // 厂家
  provider?:string; // 供应商
  brand?:string; // 品牌
  productionBatch?:Array<IProductionBatch>;
  unit?:string; // 计量单位
}

export interface IServices {
  kind:string;
  category:string;
  enterprise?:string;
  code:string;
  name:string; // 名称
  salePrice:number; // 售价
  unitPurchasePrice:number; // 单位进价
  manufacturers?:string; // 厂家
  provider?:string; // 供应商
}

export default class ProductService extends Service {
  /**
   * 创建通用产品
   * @param body
   */
  async createCommonProduct(body: ICommonProduct) {
    const { ctx } = this;
    return await ctx.model.Product.create(body);
  }

  /**
   * 创建镜片
   * @param body 
   */
  async createEyeglassProduct(body: IEyeglass) {
    const { ctx } = this;
    
    return await ctx.model.Product.create(body);
  }

  /**
   * 创建隐形眼镜
   * @param body 
   */
  async createContactLensesProduct(body: IContactLenses) {
    const { ctx } = this;
    const { model } = ctx;
    // 创建产品
    const createdProduct = new model.Product(body);
    
    if (lodash.isArray(body.productionBatch)) {
      for (const item of body.productionBatch) {
        item.productID = createdProduct._id;
      }
      await model.ProductionBatch.insertMany(body.productionBatch);
    }

    return createdProduct.save();
  }

  /**
   * 创建服务类产品
   * @param body 
   */
  async createServicesProduct(body: IServices) {
    const { ctx } = this;
    return ctx.model.Product.create(body);
  }

  async findList(query: Query) {
    const { model } = this.ctx;

    if (query.search) {
      const searchReg = new RegExp(query.search, 'i')
      query['$or'] = [
        { code: searchReg },
        { name: searchReg },
      ]

      
    }
    delete query.search;

    const resp = await pagedResultBuild<IProduct>(model.Product, query, mdl => {
      return mdl.populate('enterpriseInfo');
    });

    return resp;
  }

  async findSimpleProducts(query: Query) {
    const { model } = this.ctx;
    const { enterprise } = query;
    const condition: IDict = { enterprise, deleted: false };
    return await model.Product.find(condition);
  }

  async findInfo(id: ObjectID) {
    const { model } = this.ctx;

    const info = await model.Product.findOne({
      _id: id,
    });

    return info;
  }

  async findBatchsByProduct(query: Query) {
    const { model } = this.ctx;
    const { id, search } = query;

    const info = await model.ProductionBatch.find({
      productID: id,
      batchNumber: new RegExp(search, 'i')
    }).populate('product');

    return info;
  }

  async findProductStockList(query: Query) {
    const { model } = this.ctx;

    const result = await pagedResultBuild<IProductStock>(model.ProductStock, query, (mdl) => {
      return mdl
        .populate('productInfo')
        .populate('productBatchInfo')
    });

    return result;
  }
}