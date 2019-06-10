
import { Controller } from 'egg';
import { validateBody, validateQueryWithPager, validateQuery, validateParams } from '../common/query.model';
import { CommonProductRules, EyeglassProductRules, ContactLensesRules, ServicesRules } from '../model/Product';

export default class ProductController extends Controller {

  @validateBody({
    kind: 'string',
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
    }
    ctx.status = 201;
  }

  @validateBody(CommonProductRules)
  async createCommon() {
    const { ctx } = this;
    const { service } = ctx;
    const resp = await service.product.createCommonProduct(ctx.request.body);

    ctx.body = resp;
    ctx.status = 201;
  }

  @validateBody(EyeglassProductRules)
  async createEyeglass() {
    const { ctx } = this;
    const { service } = ctx;
    const resp = await service.product.createEyeglassProduct(ctx.request.body);

    ctx.body = resp;
    ctx.status = 201;
  }

  @validateBody(ContactLensesRules)
  async createContactLenses() {
    const { ctx } = this;
    const { service } = ctx;
    
    const resp = await service.product.createContactLensesProduct(ctx.request.body);

    ctx.body = resp;
    ctx.status = 201;
  }

  @validateBody(ServicesRules)
  async createServices() {
    const { ctx } = this;
    const { service } = ctx;
    
    const resp = await service.product.createServicesProduct(ctx.request.body);

    ctx.body = resp;
    ctx.status = 201;
  }

  @validateQueryWithPager({
    enterprise: 'string',
  })
  async index() {
    const { ctx } = this;
    const resp = await ctx.service.product.findList(ctx.request.query);

    ctx.body = resp;
  }

  @validateQuery({
    enterprise: 'ObjectId',
  })
  async findSimpleProductList() {
    const { ctx } = this;
    
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

  @validateParams({
    id: 'ObjectId',
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

  @validateQuery({
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

  @validateQueryWithPager({
    enterprise: 'string',
    search: { type: 'string', required: false },
  })
  async findProductStockList() {
    const { service, request } = this.ctx;
    console.log(request.query, '>>>>query');
    const list = await service.product.findProductStockList(request.query);

    this.ctx.body = list;
  }

  @validateParams({
    id: 'ObjectId',
  })
  async destroy() {
    const { ctx } = this;
    const { service } = ctx;
    const { id } = ctx.params;
    const res = await service.product.remove(id);

    ctx.body = res;
  }
  
}