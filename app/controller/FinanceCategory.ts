
import { Controller } from 'egg';
import { FinanceCategoryValidationRule } from '../model/FinanceCategory';
import { body, request, summary } from '@fsba/egg-wrapper';


export default class FinanceCategoryController extends Controller {

  @request('get', '/finance_category')
  @body(FinanceCategoryValidationRule)
  @summary('获取记账分类')
  async create() {
    const { ctx } = this;

    const category = await ctx.service.financeCategory.create(ctx.request.body);

    ctx.body = category;
    ctx.status = 201;
  }

}