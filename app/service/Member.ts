import { Service } from 'egg';
import { IMember } from '../model/Member';
import { MemberDTO } from '../dto/member';
import { getMainConnection } from '../common/query.model';
import { hashPassword ,comparePassword } from '../utils/mbcrypt';
import stringRandom from 'string-random';
import { ActionError } from '../exception';
import { LOCAL_PROVIDER } from '../model/Authorization';

export default class Member extends Service{
  /**
   * 注册
   * @param memberBody 
   */
    async createMember(memberBody: MemberDTO): Promise<IMember> {
      const { ctx } = this;
      const { model, app: { mongooseDB } } = ctx;
      const { phone, password } = memberBody;
      //获取mongooseDB会话
      const client = getMainConnection(mongooseDB);
      //获取session
      const session = await client.startSession();
      //开启事务
      session.startTransaction();
      try {
        const hashMemberName = stringRandom();  //随机字符串
        const hashedPassword = await hashPassword(password);
        //保存member  账号
        const memberBo =  new model.Member({
          memberName:hashMemberName,
          phone:phone,
        });
        //保存Cryptogram  密码
        const cryptogram = new model.Cryptogram({
          provider:'meYup',
          password:hashedPassword,
          memberId:memberBo._id,
        });
        const memberVo  = await memberBo.save({session});
        await cryptogram.save({session});
        //提交事务
        await session.commitTransaction();
        //关闭session
        session.endSession();
        return memberVo;
      } catch (error) {
        await session.abortTransaction();
        session.endSession();
        return error;
      }
    }
    /**
     * 验证手机是否存在？
     * 不存在、发送验证码
     * 存在、警告被占用
     */
    async checkPhone(phone: string){
      const { ctx } = this;
      const { model } = ctx;
      const num =  await model.Member.countDocuments({phone:phone});
      //判断是否存在手机号
      if(num > 0){
      //若存在  返回存在异常
        throw new ActionError('该手机号已存在');
      }
      //若不存在  发送验证码
       ctx.smsUtils.sendValidateCode(phone,'checkPhone');
    }

    /**
     * App账号密码登录
     */
    async loginApp(loginBody:MemberDTO){
      const { ctx } = this;
      const { model } = ctx;
      const member =  await model.Member.findOne({phone:loginBody.phone});
      if(!member){
        ctx.throw('not found the member', 404);
        return;
      }
      const cryptogram = await model.Cryptogram.findOne({memberId:member._id.toString(),provider: LOCAL_PROVIDER});
      if(!cryptogram){
        ctx.throw('not found the cryptogram', 404);
        return;
      }
      if (await comparePassword(loginBody.password, cryptogram.password)) {
        return {
          ...member.toJSON(),
        };
      }
      return ;
    }

    async codeLoginApp(loginBody:MemberDTO):Promise<IMember>{
      const { ctx } = this;
      const { model } = ctx ;
      //校验验证码
      const boolean =  ctx.smsUtils.isValid(loginBody.phone,loginBody.validateCode,'loginCode');
      if(!boolean){
        new ActionError('验证码错误');
      }
      //查询会员信息
      const memberVo = await model.Member.findOne({phone:loginBody.phone});
      if(!memberVo){
        new ActionError('用户不存在');
      }
      return memberVo;
    }
}