import { Controller } from 'egg';
import { request, path, summary } from '@fsba/egg-wrapper';
export default class SmsController extends Controller {

  @request('put', '/sms/validateCode/{phoneNumber}/k/{kind}')
  @summary('发送短信')
  @path({
    phoneNumber: {
      type: 'string',
      required: true,
    },
    kind: {
      type: 'string',
      required: true,
    },
  })
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