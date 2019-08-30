import { Service } from 'egg';
import { IAccess } from '../model/Access';
import { buildCondition } from '../common/query.model';
import lodash from 'lodash';
import { NotFoundError } from '../exception';

export default class Access extends Service {
  async createAccess(body: IAccess) {
    const { ctx } = this;

    const { model } = ctx;
    const createdAccess = await model.Access.create(body);

    return createdAccess;
  }

  async removeAccess(id: ObjectID) {
    const { ctx } = this;
    const { model } = ctx;
    const foundOne = await model.Access.findById(id);

    if (!foundOne) {
      throw new NotFoundError('Not found this access');
    }

    await model.Access.updateOne({
      _id: id,
    }, {
      deleted: true,
    });
  }

  async findAllAccess() {
    const { ctx } = this;
    const { model } = ctx;
    const foundAccess = await model.Access.find(buildCondition({}));

    const groupedAccess = lodash.groupBy(foundAccess, (item) => item.subject);

    const list: Array<{
      subject?: string;
      subjectName?: string;
      accesses?: Array<{
        id: string;
        name: string;
        displayName?: string,
      }>
    }> = []

    for (const key in groupedAccess) {
      const accesses = groupedAccess[key];

      list.push({
        subject: key,
        subjectName: accesses[0].subjectName,
        accesses: accesses.map(access => ({ id: access._id.toString(), name: access.name, displayName: access.displayName })),
      });
    }

    return list;
  }
}