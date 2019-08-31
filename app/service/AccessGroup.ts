import { Service } from 'egg';
import { getPagerParams, pagedResultBuild, buildCondition, getMainConnection } from '../common/query.model';
import { IAccessGroup } from '../model/AccessGroup';

interface AccessGroupBody {
  name?: string;
  kind?: ('system'|'enterprise');
}

export default class AccessGroup extends Service {

  async create(body: AccessGroupBody) {
    const { model, enterprise } = this.ctx;
    if (body.kind === 'enterprise') {
      body['enterprise'] = enterprise;
    }
    const createAccessGroup = await model.AccessGroup.create(body);
    return createAccessGroup;
  }

  async findList(query: Query) {
    const { model, enterprise } = this.ctx;
    const pagerParams = getPagerParams(query);
    const condition = {
      // enterprise: enterprise,
      '$or': [
        { enterprise: enterprise },
        { kind: 'system' },
      ],
      deleted: false,
      ...pagerParams,
    } as any;

    const listResults = await pagedResultBuild<IAccessGroup>(model.AccessGroup, buildCondition(condition), (mdl) => {
      return mdl.sort([['kind', -1]])
    });

    return listResults;
  }

  async remove(id: string) {
    const { model, app: { mongooseDB }, enterprise } = this.ctx;
    const client = getMainConnection(mongooseDB);

    const session = await client.startSession();
    session.startTransaction();
    try {
      const foundGroup = await model.AccessGroup.findOne({_id: id}).session(session);
      if (!foundGroup) {
        this.ctx.throw(404, 'not found this group');
      }

      if (foundGroup.enterprise.toString() !== enterprise) {
        this.ctx.throw(403, 'no access');
      }

      foundGroup.deleted = true;
      await foundGroup.save({ session});
      await session.commitTransaction();
      session.endSession();
    } catch (e) {
      await session.abortTransaction();
      session.endSession();
    }
  }

  async updateName(id: string, name: string) {
    const { model, app: { mongooseDB }, enterprise } = this.ctx;
    const client = getMainConnection(mongooseDB);

    const session = await client.startSession();
    session.startTransaction();
    try {
      const foundGroup = await model.AccessGroup.findOne({_id: id}).session(session);
      if (!foundGroup) {
        this.ctx.throw(404, 'not found this group');
      }

      if (foundGroup.enterprise.toString() !== enterprise) {
        this.ctx.throw(403, 'no access');
      }

      foundGroup.name = name;
      await foundGroup.save({ session});
      await session.commitTransaction();
      session.endSession();

      return foundGroup;
    } catch (e) {
      await session.abortTransaction();
      session.endSession();
      return {};
    }

  }

  async findGroupAccesses(groupID: string) {
    const { ctx } = this;
    const { model } = ctx;
    const relate = await model.AccessGroupRelate.find({
      accessGroup: groupID,
    });

    return relate.map(r => r.access);
  }

  async addAccessToGroup(groupID: ObjectID, accesses: Array<ObjectID>) {
    const { ctx, app: { mongooseDB } } = this;
    const { model } = ctx;

    const client = getMainConnection(mongooseDB);

    const session = await client.startSession();

    session.startTransaction();

    try {
      const relate: Array<{
        accessGroup?: string;
        access?: string;
      }> = [];

      const existAccess = await model.AccessGroupRelate.find({
        // access: { $in: accesses },
        access: { $in: accesses },
        accessGroup: groupID,
      }).session(session);

      const existAccessIDs = existAccess.map(ea => ea.access);
  
      for (const access of accesses) {
        if (!existAccessIDs.includes(access)) {
          relate.push({
            accessGroup: groupID,
            access,
          });
        }
      }

      // 建立权限关系
      await model.AccessGroupRelate.create(relate, { session });

      // 删除不在当前权限列表中的权限
      await model.AccessGroupRelate.deleteMany({
        access: { $nin: accesses},
        accessGroup: groupID,
      }).session(session);
      await session.commitTransaction();
      session.endSession();
    } catch (e) {
      console.error(e);
      await session.abortTransaction();
      session.endSession();
    }
    
  }

}