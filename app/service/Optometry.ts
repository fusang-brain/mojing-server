import { Service } from 'egg';
import { getPagerParams, pagedResultBuild } from '../common/query.model';

import { Optometry } from '../model/Optometry';

export default class Customer extends Service {
  async create(body: IDict) {
    const { model, enterprise } = this.ctx;
    body.enterprise = enterprise;
    const created = await model.Optometry.create(body);

    return created;
  }

  async findList(query: Query) {
    const { model } = this.ctx;
    const pagerParams = getPagerParams(query);
    const condition = {
      deleted: false,
      customerID: query.customer,
      ...pagerParams,
    } as any;

    // if (query.search) {
    //   const searchReg = new RegExp(query.search, 'i');
    //   condition['$or'] = [
    //     { name: searchReg },
    //     { contacts: searchReg },
    //     { contactPhone: searchReg },
    //   ];
    // }

    const listResults = await pagedResultBuild<Optometry>(model.Optometry, condition, (mdl) => {
      return mdl.populate('optometryPersonInfo').populate('customer')
        .sort([['optometryDate', -1], ['createdAt', -1]]);
    });

    return listResults;
  }

  async remove(id: ObjectID) {
    const { model } = this.ctx;

    await model.Optometry.update({
      _id: id,
    }, {
      deleted: true,
    });

    return id;
  }

  async findDetailsByID(id: ObjectID) {
    const { model } = this.ctx;

    // const optometry

    return await model.Optometry.findById(id);
  }

  async findListByIDcard(iDcard: string) {
    const { model } = this.ctx;
    console.log(iDcard);
    return await model.Optometry.find({ idCard: iDcard }).sort({ optometryDate: -1 });
  }
}