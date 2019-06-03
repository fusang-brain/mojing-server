import { Controller } from 'egg';

export default class HomeController extends Controller {
  public async index() {
    const { ctx, config } = this;
    
    ctx.body = {
      state: ctx.status,
      message: "Welcome To MeYup",
      version: config.version,
    };
    // ctx.bdoy = "Welcome To MeYup";
  }
}
