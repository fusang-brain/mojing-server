import { Controller } from 'egg';

export default class AccessController extends Controller {
  async createAccess() {
    const { ctx } = this;
    const { service } = ctx;
    const access = await service.access.createAccess(ctx.request.body);
    ctx.status = 201;
    ctx.body = {
      access,
    };
  }

  async removeAccess() {
    const { ctx } = this;
    const { service } = ctx;

    await service.access.removeAccess(ctx.params.id);

    ctx.body = "Deleted";
  }
 
  async getAllAccess() {
    const { ctx } = this;
    const { service } = ctx;
    const accesses = await service.access.findAllAccess();

    ctx.body = {
      accesses,
    }
  }
}