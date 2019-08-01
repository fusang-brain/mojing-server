import { Controller } from 'egg';

export default class SmsController extends Controller {
  async sendValidateCode() {
    const { ctx } = this;
    const { phoneNumber, kind } = this.ctx.params;
    let _kind = kind;
    if (kind === 'default') {
      _kind = null;
    }
    const resp = await ctx.smsUtils.sendValidateCode(phoneNumber, _kind);
    ctx.body = resp;
  }
}