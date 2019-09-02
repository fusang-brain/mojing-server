import { Controller } from 'egg';
// import { validateBody, validateParams } from '../common/query.model';
import { CreateOptometryRules } from '../dto/optometry.rule';
import { request, queryWithPager, tag, body, path } from '@fsba/egg-wrapper';
import { summary } from 'egg-swagger-decorator';

const Tag = tag('验光信息模块')

export default class OptometryController extends Controller {
  // @validateQueryWithPager({
  //   enterprise: 'ObjectId',
  // })
  @request('get', '/optometry')
  @queryWithPager()
  @summary('获取验光列表')
  @Tag
  async index() {
    const { ctx } = this;
    const { service } = ctx;
    ctx.request.query.enterprise = ctx.enterprise;
    const res = await service.optometry.findList(ctx.request.query);

    ctx.body = res;
  }

  // @validateBody(CreateOptometryRules)
  @request('post', '/optometry')
  @summary('新增验光信息')
  @Tag
  @body(CreateOptometryRules)
  async create() {
    const { ctx } = this;
    const { service } = ctx;
    const createdRes = await service.optometry.create(ctx.request.body);

    ctx.body = {
      optometry: createdRes,
    };
    ctx.status = 201;
  }

  // @validateParams({
  //   id: 'ObjectId',
  // })
  @request('delete', '/optometry/{id}')
  @path({
    id: { type: 'ObjectId', required: true, description: '验光ID'}
  })
  @Tag
  @summary('通过{id}删除验光信息')
  async destroy() {
    const { ctx } = this;
    const { service } = ctx;
    const { id } = ctx.params;
    const res = await service.optometry.remove(id);

    ctx.body = res;
  }

  // @validateParams({
  //   id: 'ObjectId',
  // })
  @request('get', '/optometry/{id}')
  @path({
    id: { type: 'ObjectId', required: true, description: '验光ID' },
  })
  @summary('获取验光详情')
  @Tag
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