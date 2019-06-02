
import { Controller } from 'egg';
import { FinanceCategoryValidationRule } from '../model/FinanceCategory';
import { validateBody } from '../common/query.model';


export default class FinanceCategoryController extends Controller {

  @validateBody(FinanceCategoryValidationRule)
  async create() {
    const { ctx } = this;

    const category = await ctx.service.financeCategory.create(ctx.request.body);

    ctx.body = category;
    ctx.status = 201;
  }

}