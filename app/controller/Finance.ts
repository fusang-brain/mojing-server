
import { Controller } from 'egg';
import { FinanceValidationRule } from '../model/Finance';
// import { validateQuery, validateParams } from '../common/query.model';
import moment from 'moment';
import { request, summary, path, queryWithPager, query } from '@fsba/egg-wrapper';


export default class FinanceController extends Controller {

  @request('get', '/finance')
  @summary('获取财务列表')
  @queryWithPager({
    enterprise: {
      type: 'string',
      description: '企业ID',
    },
    date: {
      type: 'string',
      description: '日期',
    }
  })
  async index() {
    const { ctx } = this;
    // query
    const query: Query = ctx.query as Query;

    const res = await ctx.service.finance.queryList(query);

    ctx.body = res;
  }

  @request('post', '/finance')
  @summary('新增财务')
  async create() {
    const { app, ctx } = this;

    const invalid = app.validator.validate(FinanceValidationRule, ctx.request.body);

    if (invalid) {
      ctx.throw(422, { errors: invalid });
      return;
    }

    const finance = await ctx.service.finance.create(ctx.request.body);

    ctx.body = finance;
    ctx.status = 201;
  }

  @request('delete', '/finance/{id}')
  @path({
    id: {type: 'ObjectId', description: 'objectID'},
  })
  async destroy() {
    const { ctx } = this;
    const { service } = ctx;
    const { id } = ctx.params;
    const res = await service.finance.remove(id);

    ctx.body = res;
  }


  @request('get', '/finance/statistic')
  @summary('获取财务统计')
  @query({
    enterprise: 'string',
    date: 'string',
  })
  async findStatistic() {
    const { ctx } = this;
    const { date, enterprise } = ctx.query;
    const resp = await ctx.service.finance.findStatistic(moment(date), enterprise);

    ctx.body = resp;
  }
}