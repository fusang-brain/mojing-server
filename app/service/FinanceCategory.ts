import { Service } from 'egg';
import { IFinanceCategory } from '../model/FinanceCategory';


export default class FinanceCategory extends Service {

  async create(financeCategory: IFinanceCategory): Promise<IFinanceCategory> {
    const { ctx } = this;

    const { model } = ctx;
    
    const willCreatedCategory = new model.FinanceCategory(financeCategory);

    return willCreatedCategory.save();
  }
}