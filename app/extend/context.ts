import { Context } from 'egg';
import sms from '../utils/sms';

interface UserState {
  uid?: string;
  ssid?: string;
  iat?: number;
  exp?: number;
  utype?: ('member'|'admin');
}

export default {
  get enterprise(this: Context): string {
    const enterprise = this.request.header['meyupenterprise'];

    return enterprise || '';
  },

  get userState(this: Context): UserState {
    const { user = {} } = this.state;
    return {
      uid: user.uid || '',
      ssid: user.ssid || '',
      iat: user.iat || 0,
      exp: user.exp || 0,
      utype: user.utype || null,
    }
  },

  get smsUtils(this: Context) {
    return sms(this);
  }
}