import { Service } from 'egg';
import { getPagerParams, pagedResultBuild } from '../common/query.model';
import { ICustomer } from '../model/Customer';

export default class Customer extends Service {
  async create(body: IDict) {
    const { model } = this.ctx;
    const createdCustomer = await model.Customer.create(body);

    return createdCustomer;
  }

  async findList(query: Query) {
    const { model } = this.ctx;
    const pagerParams = getPagerParams(query);
    const condition = {
      enterprise: query.enterprise,
      deleted: false,
      ...pagerParams,
    } as any;

    if (query.search) {
      const searchReg = new RegExp(query.search, 'i');
      condition['$or'] = [
        { name: searchReg },
        { mobile: searchReg },
      ];
    }

    const listResults = await pagedResultBuild<ICustomer>(model.Customer, condition);

    return listResults;
  }

  async remove(id: ObjectID) {
    const { model } = this.ctx;

    await model.Customer.update({
      _id: id,
    }, {
      deleted: true,
    });

    return id;
  }

  async update(id: ObjectID, body: IDict) {
    const { model } = this.ctx;
    const foundCustomer = await model.Customer.findOne({
      _id: id,
    });

    if (!foundCustomer) {
      this.ctx.throw('404', 'not found this customer');
    }

    await model.Customer.update({
      _id: foundCustomer._id,
    }, body);

    return foundCustomer._id;
  }

  async findDetailsByID(id: ObjectID) {
    const { model } = this.ctx;
    const customer = await model.Customer.findById(id);
    const lastOptometry = await model.Optometry.findOne({
      customerID: id,
    }).sort([['optometryDate', -1], ['createdAt', -1]]);

    return {
      ...customer.toJSON(),
      lastOptometryInfo: lastOptometry ? lastOptometry.toJSON() : {},
    }
  }

  async findCustomers(query: Query) {
    const { model } = this.ctx;
    const { search } = query;

    const info = await model.Customer.find({
      '$or': [
        {
          name: new RegExp(search, 'i'),
        },
        {
          mobile: new RegExp(search, 'i'),
        },
      ]
    }).skip(0).limit(200);

    return info;
  }
}