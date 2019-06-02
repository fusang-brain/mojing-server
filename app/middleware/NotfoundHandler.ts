import { Application, Context } from 'egg';

export default (option, app: Application) => {
  return async function notfoundHandler(ctx: Context, next): Promise<void> {
    await next();
    if (ctx.status === 404 || ctx.realStatus === 404) {
      ctx.throw(404, 'Not Found');
    }
  };
};