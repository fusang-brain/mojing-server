import { Controller } from 'egg';
import { UserDTOValidateRules, UserLoginValidateRules } from '../dto/user.rule';
import { genJwtToken } from '../utils/authorized';

export default class UserController extends Controller {
  
  async register() {
    const { app, ctx } = this;
    
    const invalid = app.validator.validate(UserDTOValidateRules, ctx.request.body);

    if (invalid) {
      // console.log(, 'invalid');
      ctx.throw(422, { errors: invalid });
    }

    const createUser = await ctx.service.user.register(ctx.request.body);

    ctx.body = createUser;
    ctx.status = 201;
  }

  async login() {
    const { app, ctx } = this;
    const invalid = app.validator.validate(UserLoginValidateRules, ctx.request.body);

    if (invalid) {
      ctx.throw(422, { errors: invalid });
      return;
    }

    const loginUser = await ctx.service.user.login(ctx.request.body);

    if (!loginUser) {
      ctx.throw(401);
      return;
    }

    loginUser.password = undefined;
    ctx.body = {
      token: genJwtToken(loginUser.user_id, app.config.jwt.secret),
      authorization: loginUser,
      authority: 'admin',
    };
    ctx.status = 201;
  }

  async operators() {
    const { ctx } = this;
    const { query } = ctx;

    const operators = await ctx.service.user.findOperators(query.enterprise);

    ctx.body = operators;
  }

  async info() {
    const { ctx } = this;
    const { user } = ctx.state;
    const info = await ctx.service.user.findOne(user.uid);

    ctx.body = {
      info,
    };
  }
}