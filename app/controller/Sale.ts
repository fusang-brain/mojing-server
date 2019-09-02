import { Controller } from 'egg';
// import { validateBody } from '../common/query.model';
// import { CreateSaleRules, RemoveSaleRules } from '../dto/sale.rule';
import { request, body, summary, query } from '@fsba/egg-wrapper';
import { CreateSaleRules, RemoveSaleRules } from '../dto/sale.rule';

export default class SaleController extends Controller {

  // @validateBody(CreateSaleRules)
  @request('post', '/sale')
  @body(CreateSaleRules)
  @summary('新增销售记录')
  async create() {
    const { ctx } = this;
    const { service } = ctx;
    ctx.status = 201;
    const resp = await service.sale.create(ctx.request.body);

    ctx.body = resp;
  }

  @request('delete', '/sale/del')
  @body(RemoveSaleRules)
  @summary('删除销售记录')
  async del() {
    const { ctx } = this;
    const { service, request } = ctx;
    ctx.status = 201;
    const delOK = await service.sale.delRecord(request.body.id);

    if (delOK) {
      ctx.status = 200;
    } else {
      ctx.status = 400;
    }
  }

  @request('get', '/sale')
  @summary('获取销售记录列表')
  @query({
    search: { type: 'string', required: true, description: '搜索' }
  })
  async index() {
    const { ctx } = this;
    const { service } = ctx;
    ctx.request.query.enterprise = ctx.enterprise;
    const resp = await service.sale.findList(ctx.request.query);

    ctx.body = resp;
  }

  
}