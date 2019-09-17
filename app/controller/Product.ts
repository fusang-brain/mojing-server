
import { Controller } from 'egg';
// import { validateBody, validateQueryWithPager, validateQuery, validateParams } from '../common/query.model';
import { CommonProductRules, EyeglassProductRules, ContactLensesRules, ServicesRules } from '../model/Product';
import { body, request, path, queryWithPager, summary, query, tag, validate } from '@fsba/egg-wrapper';

const Tag = tag('商品模块')

export default class ProductController extends Controller {

  @request('post', '/product')
  @summary('新增商品')
  @Tag
  @body({
    kind: { type: 'string', description: '商品类型' }
  })
  async create() {
    const { ctx } = this;
    const { kind } = ctx.request.body;
    ctx.body = {};
    switch (+kind) {
      case 0:
        await this.createCommon();
        break;
      case 1:
        await this.createEyeglass();
        break;
      case 2:
        await this.createContactLenses();
        break;
      case 3:
        await this.createServices();
        break;
      default:
        break;
    }
    ctx.status = 201;
  }

  @request('put', '/product/{id}')
  @summary('修改商品信息')
  @Tag
  @path({
    id: { type: 'ObjectId', required: true, description: '商品ID'}
  })
  async update() {
    const { ctx } = this;
    const { id } = ctx.params;

    const { body } = ctx.request;

    await ctx.service.product.update(id, body);

    ctx.body = 'Updated';
  }

  // @validateBody(CommonProductRules)
  @validate('body', CommonProductRules)
  async createCommon() {
    const { ctx } = this;
    const { service } = ctx;
    const resp = await service.product.createCommonProduct(ctx.request.body);

    ctx.body = resp;
    ctx.status = 201;
  }

  @validate('body', EyeglassProductRules)
  async createEyeglass() {
    const { ctx } = this;
    const { service } = ctx;
    const resp = await service.product.createEyeglassProduct(ctx.request.body);

    ctx.body = resp;
    ctx.status = 201;
  }

  @validate('body', ContactLensesRules)
  async createContactLenses() {
    const { ctx } = this;
    const { service } = ctx;
    
    const resp = await service.product.createContactLensesProduct(ctx.request.body);

    ctx.body = resp;
    ctx.status = 201;
  }

  // @validateBody(ServicesRules)
  @validate('body', ServicesRules)
  async createServices() {
    const { ctx } = this;
    const { service } = ctx;
    
    const resp = await service.product.createServicesProduct(ctx.request.body);

    ctx.body = resp;
    ctx.status = 201;
  }

  @request('get', '/product')
  @queryWithPager()
  @Tag
  @summary('获取商品列表')
  async index() {
    const { ctx } = this;

    ctx.request.query.enterprise = ctx.enterprise;
    const resp = await ctx.service.product.findList(ctx.request.query);

    ctx.body = resp;
  }

  @request('get', '/product/simpleList')
  @Tag
  @summary('获取简单商品列表')
  async findSimpleProductList() {
    const { ctx } = this;
    ctx.request.query.enterprise = ctx.enterprise;
    const { list = [], total } = await ctx.service.product.findSimpleProducts(ctx.request.query);
    ctx.body = {
      total,
      list: list.map(item => (
        {
          _id: item._id,
          category: item.category,
          code: item.code,
          name: item.name,
          kind: item.kind,
        }
      )),

    };
  }

  
  @request('get', '/product/{id}')
  @summary('获取商品详情')
  @Tag
  @path({
    id: {
      type: 'string',
      required: true,
      description: '商品ID',
    }
  })
  async show() {
    const { ctx } = this;
    const { service } = ctx;

    const { id } = ctx.params;
    const resp = await service.product.findInfo(id);

    

    ctx.body = {
      info: resp,
    }
  }

 
  @request('get', '/product/batches')
  @summary('获取商品批次')
  @Tag
  @query({
    id: 'ObjectId',
    search: { type: 'string', required: false }
  })
  async findBatchsByProductID() {
    const { service, request } = this.ctx;

    const list = await service.product.findBatchsByProduct(request.query)

    this.ctx.body = {
      list,
    };
    
  }

  @request('get', '/product/stockList')
  @Tag
  @queryWithPager({
   // enterprise: 'string',
    search: { type: 'string', required: false },
  })
  @summary('获取商品库存列表')
  async findProductStockList() {
    const { service, request, enterprise } = this.ctx;
    request.query.enterprise = enterprise;
    const list = await service.product.findProductStockList(request.query);

    this.ctx.body = list;
  }

  @request('delete', '/product/{id}')
  @Tag
  @path({
    id: {
      type: 'ObjectId',
      required: true,
      description: '商品ID',
    }
  })
  @summary('删除商品')
  async destroy() {
    const { ctx } = this;
    const { service } = ctx;
    const { id } = ctx.params;
    const res = await service.product.remove(id);

    ctx.body = res;
  }


  @request('post', '/product/createBatch')
  @Tag
  @validate('body', {
    productID: 'string',
    expirationDate: { type: 'string', required: true },
    startDate: { type: 'string', required: true },
    color: { type: 'string', required: false },
    diameter: { type: 'string', required: false },
    BOZR: { type: 'string', required: false },
    diopter: { type: 'string', required: false },
    batchNumber: { type: 'string', required: true },
  })
  async createBatch() {
    const { ctx } = this;

    const { service, request } = ctx;
    // console.log('body', body);
    const res = await service.product.createBatch(request.body);
    ctx.status = 201;
    ctx.body = res;
    
  }

  @request('delete', '/product/batch/{id}')
  @path({
    id: { type: 'ObjectId', required: true, description: '批次ID'}
  })
  async deleteBatch() {
    const { ctx } = this;
    const { service } = ctx;
    await service.product.removeBatch(ctx.params.id);
    ctx.body = 'Deleted';
  }

}