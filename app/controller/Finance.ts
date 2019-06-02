
import { Controller } from 'egg';
import { FinanceValidationRule } from '../model/Finance';
import { validateQuery, validateQueryWithPager } from '../common/query.model';
import * as moment from 'moment';

export default class FinanceController extends Controller {

  @validateQueryWithPager({
    enterprise: 'string',
    date: 'string',
  })
  async index() {
    const { ctx } = this;
    // query
    const query: Query = ctx.query as Query;

    const res = await ctx.service.finance.queryList(query);

    ctx.body = res;
  }

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

  @validateQuery({
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