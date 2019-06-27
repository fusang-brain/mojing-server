import { Application } from 'egg';

export default {
  getEnterprise(this: Application) {
    return this.context.get('Enterprise') || '';
  },
}