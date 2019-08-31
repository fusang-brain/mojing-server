import { Service } from 'egg';
import { pagedResultBuild, getPagerParams } from '../common/query.model';
import { IProvider } from '../model/Provider';

export default class ProviderService extends Service {
  async create(body: IDict) {
    const { model } = this.ctx;
    body.enterprise = this.ctx.enterprise;
    const createdProvider = await model.Provider.create(body);

    return createdProvider;
  }

  async findList(query: Query) {
    const { model } = this.ctx;
    const pagerParams = getPagerParams(query);
    const condition = {
      deleted: false,
      ...pagerParams,
    } as any;

    if (query.search) {
      const searchReg = new RegExp(query.search, 'i');
      condition['$or'] = [
        { name: searchReg },
        { contacts: searchReg },
        { contactPhone: searchReg },
      ];
    }

    const listResults = await pagedResultBuild<IProvider>(model.Provider, condition);

    return listResults;
  }

  async update(id: ObjectID, body: IDict) {
    const { model } = this.ctx;
    const foundProvider = await model.Provider.findOne({
      _id: id,
    });

    if (!foundProvider) {
      this.ctx.throw('404', 'not found this provider');
    }

    await model.Provider.update({
      _id: foundProvider._id,
    }, body);

    return foundProvider._id;
  }

  async remove(id: ObjectID) {
    const { model } = this.ctx;

    await model.Provider.update({
      _id: id,
    }, {
      deleted: true,
    });

    return id;
  }

  async findSimpleProvidersByEnterprise(enterprise: string) {
    const { model } = this.ctx;
    const list = await model.Provider.find();

    return list.map(item => ({
      _id: item._id,
      name: item.name,
    }));
  }

  async findDetailsByID(id: ObjectID) {
    const { model } = this.ctx;

    return await model.Provider.findById(id);
  }
}