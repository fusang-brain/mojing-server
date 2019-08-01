import { Application } from 'egg';
export default (app: Application) => {
  app.validator.addRule('ObjectId', /^[0-9a-fA-F]{24}$/);

  app['sessionStore'] = {
    async get(key: string) {
      const res = await app['redis'].get(key);
      if (!res) return null;
      return JSON.parse(res);
    },
    async set (key: string, value: any, maxAge?: number) {
      // maxAge not present means session cookies
      // we can't exactly know the maxAge and just set an appropriate value like one day
      if (!maxAge) maxAge = 24 * 60 * 60 * 1000;
      value = JSON.stringify(value);
      await app['redis'].set(key, value, 'PX', maxAge);
    },
    async destroy (key: string) {
      await app['redis'].del(key);
    },
  }
};