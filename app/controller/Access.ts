import { Controller } from 'egg';
import { request, path, summary, tag } from '@fsba/egg-wrapper';
const Tag = tag('权限模块');
export default class AccessController extends Controller {
  @request('post', '/access/')
  @summary('创建权限')
  @Tag
  async createAccess() {
    const { ctx } = this;
    const { service } = ctx;
    const access = await service.access.createAccess(ctx.request.body);
    ctx.status = 201;
    ctx.body = {
      access,
    };
  }
  @request('delete', '/access/{id}')
  @Tag
  @path({
    id: {
      type: 'ObjectId',
      required: true,
      description: '权限ID',
    }
  })
  @summary('删除权限')
  async removeAccess() {
    const { ctx } = this;
    const { service } = ctx;

    await service.access.removeAccess(ctx.params.id);

    ctx.body = "Deleted";
  }

  @request('get', '/access/')
  @summary('获取权限')
  @Tag
  async getAllAccess() {
    const { ctx } = this;
    const { service } = ctx;
    const accesses = await service.access.findAllAccess();

    ctx.body = {
      accesses,
    }
  }
}