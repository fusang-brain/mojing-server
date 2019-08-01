import { Service } from 'egg';
import { NotFoundError } from '../exception';
import { getPagerParams, pagedResultBuild, buildCondition } from '../common/query.model';
import { IEnterprise } from '../model/Enterprise';

export default class Enterprise extends Service {
  async findDetails(id: string) {
    const { model } = this.ctx;

    const foundOne = await model.Enterprise.findById(id);

    if (!foundOne) {
      throw new NotFoundError();
    }

    return foundOne;
  }

  async findListByUserID(id: string) {
    const { ctx } = this;
    const foundUser = await ctx.model.User.findOne({
      _id: id,
    });

    if (!foundUser) {
      throw new NotFoundError();
    }

    const enterprises = foundUser.enterprises;

    const enterpriseList = await ctx.model.Enterprise.find({
      _id: { '$in': enterprises },
    });

    return enterpriseList;
  }

  async findList(query) {
    const { model, enterprise } = this.ctx;
    const pagerParams = getPagerParams(query);
    const condition = {
      '$or': [
        { enterprise: enterprise },
        { kind: 'system' },
      ],
      deleted: false,
      ...pagerParams,
    } as any;

    const listResults = await pagedResultBuild<IEnterprise>(model.Enterprise, buildCondition(condition), (mdl) => {
      return mdl.sort([['kind', -1]])
    });

    return listResults;
  }

  async updateInfo(id: string, data: any) {
    const { model } = this.ctx;

    // console.log(data, 'data');
    const foundOne = await model.Enterprise.findById(id);

    if (!foundOne) {
      throw new NotFoundError('Not found this enterprise');
    }

    await model.Enterprise.updateOne({
      _id: id,
    }, data);

    return await model.Enterprise.findById(id);
  }
  
  async remove(id: string) {
    const { ctx } = this;

    const foundOne = await ctx.model.Enterprise.findById(id);

    if (!foundOne) {
      throw new NotFoundError('Not found this enterprise');
    }

    await ctx.model.Enterprise.updateOne({
      _id: id,
    }, {
      deleted: false,
    });
  }
}