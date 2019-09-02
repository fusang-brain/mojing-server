import { Controller } from 'egg';
import { UserDTOValidateRules, UserLoginValidateRules } from '../dto/user.rule';
import { genJwtToken } from '../utils/authorized';
import { request, summary, body, tag } from '@fsba/egg-wrapper';

const Tag = tag('用户模块');

export default class UserController extends Controller {
  
  @request('post', '/user/register')
  @summary('用户注册')
  @Tag
  async register() {
    const { app, ctx } = this;
    
    const invalid = app.validator.validate(UserDTOValidateRules, ctx.request.body);

    if (invalid) {
      // console.log(, 'invalid');
      ctx.throw(422, { errors: invalid });
    }

    const createUser = await ctx.service.user.register(ctx.request.body);

    ctx.body = {
      authority: 'admin',
      token: genJwtToken(createUser._id, app.config.jwt.secret),
      authorization: createUser,
    };
    ctx.status = 201;
  }

  @request('post', '/user/login')
  @summary('用户登录')
  @Tag
  @body(UserLoginValidateRules)
  // UserLoginValidateRules
  async login() {
    const { app, ctx } = this;
    // const invalid = app.validator.validate(UserLoginValidateRules, ctx.request.body);
    
    // if (invalid) {
    //   ctx.throw(422, { errors: invalid });
    //   return;
    // }
    // console.log(ctx.request.body);

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

  @request('get', '/user/operators')
  @Tag
  @summary('获取操作人列表')
  async operators() {
    const { ctx } = this;
    
    const operators = await ctx.service.user.findOperators(ctx.enterprise);

    ctx.body = operators;
  }

  @request('get', '/user/info')
  @Tag
  @summary('获取当前登录用户的用户详情')
  async info() {
    const { ctx } = this;
    const { user } = ctx.state;
    const info = await ctx.service.user.findOne(user.uid);

    ctx.body = {
      info,
    };
  }
}