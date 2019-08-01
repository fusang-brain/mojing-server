import { Context, Application } from 'egg';
import * as Core from '@alicloud/pop-core';
import { genValidateCode } from './mbcrypt';
import { ActionError } from '../exception';
import * as moment from 'moment';

interface IParams {
  RegionId?: string;
  PhoneNumbers: string;
  SignName: string;
  TemplateCode: string;
  TemplateParam: string;
  SmsUpExtendCode?: string;
  OutId?: string;
}

interface IBatchParams {
  RegionId?: string;
  PhoneNumbers: Array<string>;
  SignNames: Array<string>;
  TemplateCode: string;
  TemplateParam: string;
  SmsUpExtendCode?: Array<string>;
}

interface IQueryParams {
  RegionId?: string;
  PhoneNumbers: string;
  SendDate: string;
  PageSize: string;
  CurrentPage: string;
  BizId?: string;
}

let instance: SMSService = null;

class SMSService {
  client: Core;
  app: Application;
  ctx: Context;

  requestOption: {
    method: 'POST'
  };

  constructor(accessID: string, secret: string, ctx: Context) {
    this.client = new Core({
      accessKeyId: accessID,
      accessKeySecret: secret,
      apiVersion: '2017-05-25',
      endpoint: 'https://dysmsapi.aliyuncs.com',
    });
    this.app = ctx.app;
    this.ctx = ctx;

  }

  async sendSMS(params?: IParams) {
    try {
      const resp = await this.client.request('SendSms', params, {
        method: 'POST',
      });
  
      return resp;
    } catch (err) {
      throw new ActionError(err);
    }
    
  }

  async querySendDetails(params?: IQueryParams) {
    try {
      const resp = await this.client.request('QuerySendDetails', params, {
        method: 'POST',
      });
  
      return resp;
    } catch (err) {
      throw new ActionError(err);
    }
    
  }

  async sendBatchSMS(params?: IBatchParams) {
    try {
      const resp = await this.client.request('SendBatchSms', params, {
        method: 'POST',
      });
  
      return resp;
    } catch(err) {
      throw new ActionError(err);
    }
    
  }

  async isValid(phoneNumber: string, code: string, kind?: string) {
    const _kind = kind || 'validate';
    const context = this.ctx;
    const key = `${phoneNumber}_${_kind}`;
    // console.log(key, 'key');
    // console.log(context.session);
    const cached = context.session[key];
    console.log(cached, 'cached');
    if (!cached) {
      console.log('no cached');
      return false;
    }

    // now  >= 5m + createdAt

    if (moment(cached.expiredAt).isBefore(moment())) {
      console.log(moment().toISOString());
      // throw new ActionError('验证码错误');
      console.log('过期了');
      return false;
    }

    console.log(cached.validateCode, ' - ', code);
    if (cached.validateCode === code) {
      return true;
    }

    return false;
  }

  async sendValidateCode(phoneNumber: string, kind?: string) {
    const _kind = kind || 'validate';
    // const { context } = this.app;
    const context = this.ctx;
    const key = `${phoneNumber}_${_kind}`
    const cached = context.session[key];
    if (cached && moment(cached.createdAt).add(1, 'm').isAfter(moment())) {
      throw new ActionError('单位时间内请求次数过多!');
    }
    
    const valiateCode = genValidateCode();
    const resp = await this.sendSMS({
      PhoneNumbers: phoneNumber,
      SignName: '扶桑彼岸',
      TemplateCode: 'SMS_171117794',
      TemplateParam: JSON.stringify({
        code: valiateCode,
      }),
    });
    if (resp) {
      // 生成验证码后 缓存 60s
      context.session[key] = {
        validateCode: valiateCode,
        createdAt: moment().toISOString(),
        expiredAt: moment().add(5, 'm').toISOString(),
      };
    }
    return resp;
  }
}

export default (ctx: Context) => {
  const app = ctx.app;
  if (instance) {
    return instance;
  }
  const srv = new SMSService(app.config.alicloud.accessID, app.config.alicloud.accessSecret, ctx);
  instance = srv;
  return instance;
}