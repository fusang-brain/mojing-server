import { Context } from 'egg';
import sms from '../utils/sms';

export default {
  get enterprise(this: Context): string {
    const enterprise = this.request.header['meyupenterprise'];

    return enterprise || '';
  },

  get smsUtils(this: Context) {
    return sms(this);
  }
}