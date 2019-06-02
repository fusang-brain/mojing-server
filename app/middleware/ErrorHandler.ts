import { Application, Context } from 'egg';

export default (options, app: Application) => {
  return async function errHandler(ctx: Context, next: () => any): Promise<void> {
    try {
      await next();
    } catch (err) {

      ctx.body = {};
      // 所有的异常都在 app 上触发一个 error 事件，框架会记录一条错误日志
      app.emit('error', err, this);
      
      const status = err.status || 500;

      // 生产环境时 500 错误的详细错误内容不返回给客户端，因为可能包含敏感信息
      const error = status === 500 && app.env === 'prod'
         ? 'Internal Server Error'
         : err.message;

      // 从 error 对象上读出各个属性，设置到响应中
      ctx.body = { error };
      if (status === 422) {
        ctx.body.detail = err.errors;
      }

      ctx.status = status;
    }
  }
}