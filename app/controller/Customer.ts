import { Controller } from 'egg';
// import { validateBody, validateParams } from '../common/query.model';
import { CreateCustomerRules, UpdateCustomerRules } from '../dto/customer.rule';
import { request, queryWithPager, summary, tag, body, path } from '@fsba/egg-wrapper';

const Tag = tag('会员模块');

export default class CustomerController extends Controller {

  @request('get', '/customer')
  @Tag
  @queryWithPager({})
  @summary('获取客户列表')
  async index() {
    const { ctx } = this;
    const { service } = ctx;
    ctx.request.query.enterprise = ctx.enterprise;
    const res = await service.customer.findList(ctx.request.query);

    ctx.body = res;
  }

  @request('post', '/customer')
  @Tag
  @summary('新增客户')
  @body(CreateCustomerRules)
  async create() {
    const { ctx } = this;
    const { service } = ctx;
    const createdRes = await service.customer.create(ctx.request.body);

    ctx.body = {
      customer: createdRes,
    };
    ctx.status = 201;
  }


  @request('put', '/customer/{id}')
  @Tag
  @path({
    id: {
      type: 'ObjectId',
      required: true,
      description: '会员id'
    }    
  })
  @summary('修改会员信息')
  @body(UpdateCustomerRules)
  async update() {
    const { ctx } = this;
    const { service } = ctx;
    const { id } = ctx.params;
    const res = await service.customer.update(id, ctx.request.body);

    ctx.body = res;
    ctx.status = 201;
  }

  @request('delete', '/customer/{id}')
  @path({
    id: { type: 'ObjectId', required: true, description: '客户ID' },
  })
  @Tag
  @summary('删除客户')
  async destroy() {
    const { ctx } = this;
    const { service } = ctx;
    const { id } = ctx.params;
    const res = await service.customer.remove(id);

    ctx.body = res;
  }

  @request('get', '/customer/{id}')
  @Tag
  @path({
    id: { type: 'ObjectId', required: true, description: '客户ID' },
  })
  @summary('通过 {id} 获取客户信息')
  async show() {
    const { ctx } = this;
    const { service } = ctx;
    const { id } = ctx.params;

    const details = await service.customer.findDetailsByID(id);

    ctx.body = {
      details,
    };
  }

  @request('get', '/customer/findCustomers')
  @Tag
  @queryWithPager({
    // enterprise: 'string',
    search: { type: 'string', required: false },
  })
  @summary('获取商品库存列表')
  async getCustomerList() {
    const { ctx } = this;
    const { service } = ctx;

    // const { search } = ctx.params;
    ctx.query.enterprise = ctx.enterprise;
    const list = await service.customer.findCustomers(ctx.query);

    this.ctx.body = {
      list,
    };
  }
}