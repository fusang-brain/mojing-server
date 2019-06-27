import { Context } from 'egg';

export default {
  get enterprise(this: Context) {
    const enterprise = this.request.header['meyupenterprise'];

    return enterprise || '';
  }
}