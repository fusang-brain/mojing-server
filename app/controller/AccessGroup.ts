import { Controller } from 'egg';
import { validateParams, validateBody, validateQueryWithPager } from '../common/query.model';

export default class AccessGroupController extends Controller {


  @validateQueryWithPager({})
  async index() {
    const { ctx } = this;
    const { service } = ctx;
    const res = await service.accessGroup.findList(ctx.request.query);
  
    ctx.body = res;
  }

  @validateBody({
    name: { type: 'string' },
    kind: { type: 'enum', values: ['system','enterprise'] },
  })
  async create() {
    const { ctx } = this;
    const { service } = ctx;

    const createdRes = await service.accessGroup.create(ctx.request.body);

    ctx.body = {
      group: createdRes,
    };
    
    ctx.status = 201;
  }

  @validateBody({
    name: 'string',
  })
  @validateParams({
    id: 'ObjectId',
  })
  async update() {
    const { ctx } = this;
    const { service } = ctx;
    const { id } = ctx.params;
    const res = await service.accessGroup.updateName(id, ctx.request.body.name);
    
    ctx.body = {
      group: res,
    }
    ctx.status = 200;
  }

  @validateParams({
    id: 'ObjectId',
  })
  async destroy() {
    const { ctx } = this;
    const { service } = ctx;

    const { id } = ctx.params;
    await service.accessGroup.remove(id);

    ctx.status = 200;
    ctx.body = 'deleted';
  }

  @validateParams({
    id: {
      type: 'ObjectId',
      required: true,
    }
  })
  async addAccessToGroup() {
    const { ctx } = this;
    const { service } = ctx;
    const { id } = ctx.params;
    const { accesses } = ctx.request.body;

    await service.accessGroup.addAccessToGroup(id, accesses);

    ctx.body = "Updated";
  }

  @validateParams({
    id: {
      type: 'ObjectId',
      required: true,
    }
  })
  async findGroupAccesses() {
    const { ctx } = this;
    const { service } = ctx;
    const { id } = ctx.params;
    const accesses = await service.accessGroup.findGroupAccesses(id);

    ctx.body = {
      accesses,
    }
  }

}