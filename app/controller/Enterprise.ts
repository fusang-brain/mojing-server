import { Controller } from 'egg';

export default class Enterprise extends Controller {
  async index() {
    const { ctx } = this;
    const list = await ctx.service.enterprise.findList(ctx.query);

    ctx.body = {
      list,
    };
  }

  async findListByUserID() {
    const { ctx } = this;
    const { id } = ctx.params;
    const list = await ctx.service.enterprise.findListByUserID(id);

    ctx.body = {
      list,
    };
  }

  async update() {
    const { ctx } = this;
    // const {  } = ctx.body;
    const { id } = ctx.params;
    const enterprise = await ctx.service.enterprise.updateInfo(id, ctx.request.body);

    ctx.body = {
      enterprise,
    };
  }

  async details() {
    const { ctx } = this;
    const { id } = ctx.params;

    const details = await ctx.service.enterprise.findDetails(id);

    ctx.body = {
      details,
    };
  }

  async remove() {
    const { ctx } = this;
    const { id } = ctx.params;

    await ctx.service.enterprise.remove(id);

    ctx.body = 'Deleted';
  }

  /**
   * 创建企业
   */
  async simpleCreate() {
    const { ctx } = this;
    const { license, payKind,  name, description, years } = ctx.request.body;

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