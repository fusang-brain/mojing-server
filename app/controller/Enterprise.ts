import { Controller } from 'egg';
import { request, path, summary, tag } from '@fsba/egg-wrapper';
const Tag = tag('企业模块');
export default class Enterprise extends Controller {
  
  @request('get', '/enterprise')
  @summary('首页')
  @Tag
  async index() {
    const { ctx } = this;
    const list = await ctx.service.enterprise.findList(ctx.query);

    ctx.body = {
      list,
    };
  }
  @request('get', '/enterprise/by-user/{id}')
  @summary('查询通过用户ID')
  @Tag
  @path({
    id: { type: 'ObjectId', required: true, description: '用户ID'}
  })
  async findListByUserID() {
    const { ctx } = this;
    const { id } = ctx.params;
    const list = await ctx.service.enterprise.findListByUserID(id);

    ctx.body = {
      list,
    };
  }
  @request('put', '/enterprise/{id}')
  @summary('修改企业信息')
  @Tag
  @path({
    id: { type: 'ObjectId', required: true, description: '企业ID'}
  })
  async update() {
    const { ctx } = this;
    // const {  } = ctx.body;
    const { id } = ctx.params;
    const enterprise = await ctx.service.enterprise.updateInfo(id, ctx.request.body);

    ctx.body = {
      enterprise,
    };
  }
  @request('get', '/enterprise/{id}')
  @summary('获取详细信息')
  @Tag
  @path({	
    id: { type: 'ObjectId', required: false }
  })
  async details() {
    const { ctx } = this;
    const { id } = ctx.params;

    const details = await ctx.service.enterprise.findDetails(id);

    ctx.body = {
      details,
    };
  }

  @request('delete', '/enterprise/{id}')
  @Tag
  @path({
    id: {
      type: 'ObjectId',
      required: true,
      description: '企业ID',
    }
  })
  @summary('删除企业')
  async remove() {
    const { ctx } = this;
    const { id } = ctx.params;

    await ctx.service.enterprise.remove(id);

    ctx.body = 'Deleted';
  }

  /**
   * 创建企业
   */
  @request('post', '/enterprise')
  @summary('创建企业')
  @Tag
  async simpleCreate() {
    const { ctx } = this;
    const { license, payKind, name, description, years } = ctx.request.body;

    const created = await ctx.service.enterprise.createWithPayment(
      license,
      payKind,
      {
        name,
        description,
      },
      years,
    );
    ctx.status = 201;
    ctx.body = created;
  }

}