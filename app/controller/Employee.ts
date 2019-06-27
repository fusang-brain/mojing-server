import { Controller } from 'egg';
import { validateQueryWithPager, validateParams, validateBody } from '../common/query.model';
import { CreateEmployeeRules, UpdateEmployeeRules } from '../dto/employee.rule';

export default class Employee extends Controller {
  @validateQueryWithPager({
    enterprise: 'ObjectId',
  })
  async index() {
    const { ctx } = this;
    const { service } = ctx;

    const res = await service.employee.findList(ctx.request.query);

    ctx.body = res;
  }

  @validateBody(CreateEmployeeRules)
  async create() {
    const { ctx } = this;
    const { service } = ctx;

    const newEmployee = await service.employee.create(ctx.request.body);

    ctx.body = {
      employee: newEmployee,
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

    await service.employee.remove(id);

    ctx.status = 200;

    ctx.body = 'deleted';
  }

  @validateBody(UpdateEmployeeRules)
  @validateParams({
    id: 'ObjectId',
  })
  async update() {
    const { ctx } = this;
    const { service } = ctx;
    const { id } = ctx.params;

    await service.employee.update(id, ctx.request.body);
    ctx.status = 200;
    ctx.body = 'ok';
  }
}