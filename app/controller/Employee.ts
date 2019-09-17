import { Controller } from 'egg';
// import { validateQueryWithPager, validateParams, validateBody } from '../common/query.model';
import { CreateEmployeeRules, UpdateEmployeeRules } from '../dto/employee.rule';
import { request, queryWithPager, body, path, summary } from '@fsba/egg-wrapper';

export default class Employee extends Controller {
  
  @request('get', '/employee')
  @summary('获取员工列表')
  @queryWithPager({
    search: {
      type: 'string',
      required: false,
      description: '搜索',
    }
  })
  async index() {
    const { ctx } = this;
    const { service } = ctx;
    ctx.request.query.enterprise = ctx.enterprise;
    const res = await service.employee.findList(ctx.request.query);

    ctx.body = res;
  }

  @request('post', '/employee')
  @summary('创建员工信息')
  @body(CreateEmployeeRules)
  async create() {
    const { ctx } = this;
    const { service } = ctx;

    const newEmployee = await service.employee.create(ctx.request.body);

    ctx.body = {
      employee: newEmployee,
    };

    ctx.status = 201;
  }

  
  // @validateParams({
  //   id: 'ObjectId',
  // })
  @request('delete', '/employee/{id}')
  @path({
    id: { type: 'ObjectId', required: false, description: '员工ID'}
  })
  @summary('通过{id}删除员工')
  async destroy() {
    const { ctx } = this;

    const { service } = ctx;

    const { id } = ctx.params;

    await service.employee.remove(id);

    ctx.status = 200;

    ctx.body = 'deleted';
  }

  // @validateBody(UpdateEmployeeRules)
  // @validateParams({
  //   id: 'ObjectId',
  // })

  @request('put', '/employee/{id}')
  @summary('删除员工')
  @path({
    id: { type: 'ObjectId', required: true, description: '客户ID' },
  })
  @body(UpdateEmployeeRules)
  async update() {
    const { ctx } = this;
    const { service } = ctx;
    const { id } = ctx.params;

    await service.employee.update(id, ctx.request.body);
    ctx.status = 200;
    ctx.body = 'ok';
  }
}