import { Controller } from 'egg';
import { request, query, summary } from '@fsba/egg-wrapper';

export default class HomeController extends Controller {

  @request('get', '/welcome')
  @query({
    name: {
      type: 'string',
      required: true,
      description: '名称',
    }
  })
  @summary('接口首页')
  public async index() {
    const { ctx, config } = this;
    const { name } = ctx.request.query;
    ctx.body = {
      state: ctx.status,
      message: `Welcome To MeYup, ${name}`,
      version: config.version,
    };
    // ctx.bdoy = "Welcome To MeYup";
  }
}
