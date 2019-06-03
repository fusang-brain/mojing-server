import { Controller } from 'egg';

export default class HomeController extends Controller {
  public async index() {
    const { ctx } = this;
    
    // ctx.body = ctx.state;
    ctx.bdoy = "Welcome To MeYup";
  }
}
