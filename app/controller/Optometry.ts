import { Controller } from 'egg';
import { validateQueryWithPager, validateBody, validateParams } from '../common/query.model';
import { CreateOptometryRules } from '../dto/optometry.rule';


export default class OptometryController extends Controller {
  @validateQueryWithPager({
    enterprise: 'ObjectId',
  })
  async index() {
    const { ctx } = this;
    const { service } = ctx;

    const res = await service.optometry.findList(ctx.request.query);

    ctx.body = res;
  }

  @validateBody(CreateOptometryRules)
  async create() {
    const { ctx } = this;
    const { service } = ctx;
    const createdRes = await service.optometry.create(ctx.request.body);

    ctx.body = {
      optometry: createdRes,
    };
    ctx.status = 201;
  }

  @validateParams({
    id: 'ObjectId',
  })
  async destroy() {
    const { ctx } = this;
    const { service } = ctx;
    const { id } = ctx.params;
    const res = await service.optometry.remove(id);

    ctx.body = res;
  }

  @validateParams({
    id: 'ObjectId',
  })
  async show() {
    const { ctx } = this;
    const { service } = ctx;
    const { id } = ctx.params;

    const details = await service.optometry.findDetailsByID(id);

    ctx.body = {
      details,
    };
  }
}