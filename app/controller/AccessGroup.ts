import { Controller } from 'egg';
// import { validateParams, validateBody, validateQueryWithPager } from '../common/query.model';
import { request, path, summary, tag, body, queryWithPager } from '@fsba/egg-wrapper';
const Tag = tag('权限模块');
export default class AccessGroupController extends Controller {


  @request('get', '/accessGroup')
  @summary('获取权限组')
  @queryWithPager({})
  async index() {
    const { ctx } = this;
    const { service } = ctx;
    const res = await service.accessGroup.findList(ctx.request.query);
  
    ctx.body = res;
  }

  @request('post', '/accessGroup')
  @summary('新增权限组')
  @body({
    name: { type: 'string', required: true },
    kind: { type: 'enum', values: ['system', 'enterprise'] },
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

  @request('put', '/accessGroup')
  @summary('修改商品信息')
  @body({
    name: {
      type: 'string',
      required: false,
    }
  })
  @path({
    id: {
      type: 'ObjectId',
      required: true,
    }
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

  @request('delete', '/accessGroup')
  @summary('删除商品')
  @path({
    id: {
      type: 'ObjectId',
      required: true,
      description: '商品ID'
    }
  })
  async destroy() {
    const { ctx } = this;
    const { service } = ctx;

    const { id } = ctx.params;
    await service.accessGroup.remove(id);

    ctx.status = 200;
    ctx.body = 'deleted';
  }

  @request('put', '/accessGroup/add-access/{id}')
  @summary('添加对组的访问权限')
  @Tag
  @path({
    id: { type: 'ObjectId', required: true}
  })
  async addAccessToGroup() {
    const { ctx } = this;
    const { service } = ctx;
    const { id } = ctx.params;
    const { accesses } = ctx.request.body;

    await service.accessGroup.addAccessToGroup(id, accesses);

    ctx.body = 'Updated';
  }

  @request('get', '/accessGroup/accesses/{id}')
  @summary('查询组权限')
  @Tag
  @path({	
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