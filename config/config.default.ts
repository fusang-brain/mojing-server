import { EggAppInfo,Context } from 'egg';
import * as pathToRegex from 'path-to-regexp';
import { MeYupConfig } from '.';

const packageConfig = require('../package');



export default (appInfo: EggAppInfo): MeYupConfig  => ({
  
  // override config from framework / plugin
  // use for cookie sign key, should change to your own and keep security
  keys: appInfo.name + '_1553332432157_7228',
  version: packageConfig.version,
  security: {
    csrf: false,
  },
  middleware: ['loadEnterprise', 'errorHandler', 'notfoundHandler'],
  mongoose: {
    client: {
      url: 'mongodb://127.0.0.1/MeYupShop',
      options: {
        poolSize: 20,
      },
    },
  },
  jwt: {
    secret: 'meYup Shop Manager',
    enable: true,
    match(ctx: Context) {

      const config = ctx.app.config;
      for (const item of config.auth.exclude) {
        const regexp = pathToRegex(item);

        if (regexp.exec(ctx.url)) {
          return false;
        }
      }

      return true;
    },
  },
  onerror: {
    all(err, ctx: Context) {
      const status = err.status || 500;
      // 生产环境时 500 错误的详细错误内容不返回给客户端，因为可能包含敏感信息
      const error = status === 500 && appInfo.env === 'prod'
        ? 'Internal Server Error'
        : err.message;
      // 从 error 对象上读出各个属性，设置到响应中
      const bodyObj = { error, detail: {} };
      if (status === 422) {
        bodyObj.detail = err.errors;
      }

      // console.log(bodyObj, '==== error');
      // console.log(typeof bodyObj, '===== error obj type');
      ctx.response.body = {};
      // ctx.body = bodyObj;
      ctx.status = status;
      // ctx.response.set('Content-Type', 'application/json');
    },
  },
  sourceUrl: `https://github.com/eggjs/examples/tree/master/${appInfo.name}`,
  auth: {
    exclude: [
      '/user/login',
      '/user/register',
      '/welcome',
      '/release',
      // '/',
    ]
  }
});
