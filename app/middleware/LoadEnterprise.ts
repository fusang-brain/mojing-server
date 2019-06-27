import { Application, Context } from 'egg';

export default (options, app: Application) => {
  return async function loadEnterpriseHandler(ctx: Context, next: () => any): Promise<void> {
    
    const enterprise = ctx.request.header['meyupenterprise'];
    const { body, query } = ctx.request;

    ctx.request.body = {
      ...body,
      enterprise,
    }

    ctx.request.query = {
      ...query,
      enterprise,
    }

    // ctx.set('Enterprise', enterprise);
    
    // console.log()
    await next();
  }
}