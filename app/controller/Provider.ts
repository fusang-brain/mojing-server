import { Controller } from 'egg';
// import { validateQueryWithPager, validateParams, validateBody } from '../common/query.model';
import { CreateProviderRules, UpdateProviderRules } from '../dto/provider.rule';
import { tag, request, summary, queryWithPager, path, body } from '@fsba/egg-wrapper';

const Tag = tag('供应商')

export default class ProviderController extends Controller {

  // @validateQueryWithPager({
  //   enterprise: 'ObjectId',
  // })
  @request('get', '/provider')
  @Tag
  @summary('获取供应商列表')
  @queryWithPager()
  async index() {
    const { ctx } = this;
    const { service } = ctx;
    ctx.request.query.enterprise = ctx.enterprise;
    const res = await service.provider.findList(ctx.request.query);

    ctx.body = res;
  }

  // @validateParams({
  //   id: 'ObjectId',
  // })
  @request('get', '/provider/{id}')
  @Tag
  @summary('获取供应商详情')
  @path({
    id: { type: 'ObjectId', required: true, description: '供应商ID' }
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

  // @validateBody(CreateProviderRules)
  @request('post', '/provider')
  @Tag
  @summary('新增供应商')
  @body(CreateProviderRules)
  async create() {
    const { ctx } = this;
    const { service } = ctx;
    const createdRes = await service.provider.create(ctx.request.body);

    ctx.body = {
      provider: createdRes,
    };
    ctx.status = 201;
  }

  // @validateParams({
  //   id: 'ObjectId',
  // })
  // @validateBody(UpdateProviderRules)
  @request('put', '/provider/{id}')
  @body(UpdateProviderRules)
  @path({
    id: { type: 'ObjectId', required: true, description: '供应商ID' }
  })
  @Tag
  @summary('更新供应商信息')
  async update() {
    const { ctx } = this;
    const { service } = ctx;
    const { id } = ctx.params;
    const res = await service.provider.update(id, ctx.request.body);

    ctx.body = res;
    ctx.status = 201;
  }

  @request('delete', '/provider/{id}')
  @path({
    id: { type: 'ObjectId', required: true, description: '供应商ID' }
  })
  @Tag
  @summary('删除供应商')
  async destroy() {
    const { ctx } = this;
    const { service } = ctx;
    const { id } = ctx.params;
    const res = await service.provider.remove(id);

    ctx.body = res;
  }
}