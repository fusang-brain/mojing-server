import { Service } from 'egg';
import { NotFoundError } from '../exception';
import { getPagerParams, pagedResultBuild, buildCondition, getMainConnection } from '../common/query.model';
import { IEnterprise } from '../model/Enterprise';
import { PaymentMethod } from '../model/EnterprisePayment';
import { genOrderNO } from '../utils/tools';
import moment from 'moment';
import ms from 'ms';

export default class Enterprise extends Service {
  async findDetails(id: string) {
    const { model } = this.ctx;

    const foundOne = await model.Enterprise.findById(id);

    if (!foundOne) {
      throw new NotFoundError();
    }

    return foundOne;
  }

  async createWithPayment(license: ('free'|'pro'), payKind: PaymentMethod, data: any, years?: number) {
    const { model, app: { mongooseDB } } = this.ctx;
    const now = moment();
    let _years = years || 1;
    let money = 0;
    if (license === 'pro') {
      money = 2880 * _years;
    }
    const client = getMainConnection(mongooseDB);

    const session = await client.startSession();
    session.startTransaction();
    try {
      // 生成企业
      const created = await model.Enterprise.create([{ ...data }], { session });

      // 生成企业证书购买记录
      const theLicense = await model.EnterpriseLicenseRecord.create([{
        orderNO: genOrderNO(),
        enterprise: created[0]._id,
        money,
        dataline: license === 'free' ? '15 days' : `${_years} year` // 1 year 一年, 1 days 一天, 1 month 一个月
      }], { session });

      // 生成支付订单
      const payment = await model.EnterprisePayment.create([{
        method: payKind,
        licenseRecord: theLicense[0]._id,
        state: license === 'free' ? 'paid' : 'wait',
      }], { session });
      
      // 设置企业期限
      if (payment[0].state === 'paid') {
        created[0].expiredAt = now.add(ms(theLicense[0].dataline)).toDate();
        await created[0].save({ session });
      }
      
      await session.commitTransaction();
      session.endSession();

      return {
        payment: payment[0],
        enterprise: created[0],
      }
    } catch(e) {
      await session.abortTransaction();
      session.endSession();
    }

    return null;
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