import { Service } from 'egg';
import { IFinance } from '../model/Finance';
import { pagedResultBuild } from '../common/query.model';
import * as moment from 'moment';
import { Types } from 'mongoose';

export default class Finance extends Service {

  // async query(month: Date): Promise<>

  async create(finance: IFinance): Promise<IFinance> {
    const { ctx } = this;
    const { model } = ctx;
    const willCreatedFinance = new model.Finance(finance);

    return await willCreatedFinance.save();
  }

  async remove(id: ObjectID) {
    const { ctx } = this;
    const { model } = ctx;
    
    const res = await model.Finance.update({
      _id: id,
    }, {
      deleted: true,
    });

    return res;
  }

  async queryList(query: Query) {
    const { ctx } = this;
    const { model } = ctx;
    const { date } = query;
    
    if (query.date) {
      query['date'] = {
        $gt: moment(date).startOf('month'),
        $lt: moment(date).endOf('month'),
      };
    }

    const res = await pagedResultBuild<IFinance>(
      model.Finance, 
      query,
      mdl => {
        return mdl.populate('operator')
      },
    );

    return res;
  }

  async findStatistic(date: moment.Moment, enterprise: string) {
    const year = date.year();
    const month = date.month()+1;
    console.log(year, month);
    const { ctx } = this;
    const { model } = ctx;
    const resp = await model.Finance.aggregate([
      {$match: { 'enterprise': Types.ObjectId(enterprise), 'deleted': false }},
      {
        $group: {
          _id: {
            month: { $month: '$date' },
            year: { $year: '$date' },
          },
          incomeTotal: { 
            $sum: {
              $cond: [
                { $eq: ['$kind', 1] },
                '$amount',
                0,
              ]
            }
          },
          outTotal: {
            $sum: {
              $cond: [
                { $eq: ['$kind', 0] },
                '$amount',
                0,
              ]
            }
          },
        }
      },
      {
        $match: {
          '_id.year': year,
          '_id.month': month,
        }
      }
    ]);

    return resp;
  }

}