import { Controller } from 'egg';
import { validateQueryWithPager, validateBody, validateParams } from '../common/query.model';
import { CreateCustomerRules, UpdateCustomerRules } from '../dto/customer.rule';

export default class CustomerController extends Controller {
  @validateQueryWithPager({
    enterprise: 'ObjectId',
  })
  async index() {
    const { ctx } = this;
    const { service } = ctx;

    const res = await service.customer.findList(ctx.request.query);

    ctx.body = res;
  }

  @validateBody(CreateCustomerRules)
  async create() {
    const { ctx } = this;
    const { service } = ctx;
    const createdRes = await service.customer.create(ctx.request.body);

    ctx.body = {
      customer: createdRes,
    };
    ctx.status = 201;
  }

  @validateParams({
    id: 'ObjectId',
  })
  @validateBody(UpdateCustomerRules)
  async update() {
    const { ctx } = this;
    const { service } = ctx;
    const { id } = ctx.params;
    const res = await service.customer.update(id, ctx.request.body);

    ctx.body = res;
    ctx.status = 201;
  }

  @validateParams({
    id: 'ObjectId',
  })
  async destroy() {
    const { ctx } = this;
    const { service } = ctx;
    const { id } = ctx.params;
    const res = await service.customer.remove(id);

    ctx.body = res;
  }

  @validateParams({
    id: 'ObjectId',
  })
  async show() {
    const { ctx } = this;
    const { service } = ctx;
    const { id } = ctx.params;

    const details = await service.customer.findDetailsByID(id);

    ctx.body = {
      details,
    };
  }
}