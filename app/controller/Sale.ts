import { Controller } from 'egg';
import { validateBody } from '../common/query.model';
import { CreateSaleRules, RemoveSaleRules } from '../dto/sale.rule';

export default class SaleController extends Controller {

  @validateBody(CreateSaleRules)
  async create() {
    const { ctx } = this;
    const { service } = ctx;
    ctx.status = 201;
    const resp = await service.sale.create(ctx.request.body);

    ctx.body = resp;
  }

  @validateBody(RemoveSaleRules)
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

  async index() {
    const { ctx } = this;
    const { service } = ctx;
    const resp = await service.sale.findList(ctx.request.query);

    ctx.body = resp;
  }

  
}