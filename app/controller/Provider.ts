import { Controller } from 'egg';
import { validateQueryWithPager, validateParams, validateBody } from '../common/query.model';
import { CreateProviderRules, UpdateProviderRules } from '../dto/provider.rule';

export default class ProviderController extends Controller {

  @validateQueryWithPager({
    enterprise: 'ObjectId',
  })
  async index() {
    const { ctx } = this;
    const { service } = ctx;

    const res = await service.provider.findList(ctx.request.query);

    ctx.body = res;
  }

  @validateParams({
    id: 'ObjectId',
  })
  async show() {
    const { ctx } = this;
    const { service } = ctx;
    const { id } = ctx.params;

    const details = await service.provider.findDetailsByID(id);

    ctx.body = {
      details,
    };
  }

  @validateBody(CreateProviderRules)
  async create() {
    const { ctx } = this;
    const { service } = ctx;
    const createdRes = await service.provider.create(ctx.request.body);

    ctx.body = {
      provider: createdRes,
    };
    ctx.status = 201;
  }

  @validateParams({
    id: 'ObjectId',
  })
  @validateBody(UpdateProviderRules)
  async update() {
    const { ctx } = this;
    const { service } = ctx;
    const { id } = ctx.params;
    const res = await service.provider.update(id, ctx.request.body);

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
    const res = await service.provider.remove(id);

    ctx.body = res;
  }
}