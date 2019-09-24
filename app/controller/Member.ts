import { Controller } from 'egg';
import { request, body, summary, tag, path } from '@fsba/egg-wrapper';
import { genJwtToken } from '../utils/authorized';
const Tag = tag('App会员模块');
export default class MemberController extends Controller {

    @request('post', '/app/member/')
    @summary('App注册会员')
    @Tag
    @body({
        phone: {type: 'string',required: true },
        password:{type:'string',required:true },
    })
    async createMember() {
      const { app,ctx } = this;//ctx 请求级  上下文信息    app  全局对象
      const { service } = ctx;
      const member = await service.member.createMember(ctx.request.body);

      ctx.body = {
        token: genJwtToken(member._id, app.config.jwt.secret),
        member: member,
      };
      ctx.status = 201;
    }

    @request('get','/app/verificationcode/{phone}')
    @summary('App注册,获取验证码')
    @Tag
    @path({
      phone: {
        type: 'string',
        required: true,
        description: '手机号',
      }
    })
    async getVerificationCode(){
      const { ctx } = this;
      const { service } = ctx;
      await service.member.checkPhone(ctx.params.phone);
      ctx.status = 201;
    }

    @request('post','/app/verificationcode')
    @summary('App注册,校验验证码')
    @Tag
    @body({
      phone:{ type:'string',required: true},
      validateCode:{ type:'string' ,required:true}
    })
    async checkVerificationCode() {
      const {ctx} = this;
      const flag = await ctx.smsUtils.isValid(ctx.request.body.phone,ctx.request.body.validateCode,'checkPhone');
      ctx.body ={
        boolean:flag,
      }
      ctx.status = 201;
    }

    @request('post','/app/login')
    @summary('App登录,账号密码')
    @Tag
    @body({
      phone:{type:'string',required:true},
      password:{type:'string',required:true},
    })
    async loginApp(){
      const { app , ctx } = this;
      const { service } = ctx;
      const member =  await service.member.loginApp(ctx.request.body);

      if (!member) {
        ctx.throw(401);
        return;
      }

      ctx.body = {
        token: genJwtToken(member._id, app.config.jwt.secret),
        member: member,
      };
      ctx.status = 201;
    }

    @request('get','/app/login/verificationcode/{phone}')
    @summary('App验证码登录,获取验证码')
    @Tag
    @path({
      phone: {
        type: 'string',
        required: true,
        description: '手机号',
      }
    })
    async getLoginCode(){
      const { ctx } = this;
      ctx.smsUtils.sendValidateCode(ctx.params.phone,'loginCode');
      ctx.status = 201;
    }

    @request('post','/app/login/verificationcode')
    @summary('App验证码登录,校验')
    @Tag
    @body({
      phone:{type:'string',required:true},
      validateCode:{type:'string',required:true}
    })
    async codeLoginApp(){
      const { app, ctx } = this;
      const { service } = ctx;
      const member = await service.member.codeLoginApp(ctx.request.body);

      if (!member) {
        ctx.throw(401);
        return;
      }

      ctx.body = {
        token: genJwtToken(member._id, app.config.jwt.secret),
        member: member,
      };
      ctx.status = 201;

    }
}