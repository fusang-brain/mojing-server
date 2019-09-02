import { Service } from 'egg';
import { getPagerParams, pagedResultBuild, getMainConnection } from '../common/query.model';
import { ISale } from '../model/Sale';
import { Connection } from 'mongoose';

export default class SaleService extends Service {
  async create(body: IDict) {
    
    const { model, app: { mongooseDB } } = this.ctx;
    body.enterprise = this.ctx.enterprise;
    let client: Connection;

    if (mongooseDB instanceof Connection) {
      client = mongooseDB;
    } else {
      client = mongooseDB.get('main');
    }

    const session = await client.startSession();

    session.startTransaction();
    try {
      const createdSale = new model.Sale(body);
      const { products = [], productsCount = [] } = body;
      // console.log(productsCount, 'pcs');
      const productCountMap = {};
      for (const pc of productsCount) {
        productCountMap[pc.id] = pc.count;
      }

      // console.log(products, 'products');

      // console.log(productCountMap, 'pcMap');

      const foundProducts = await model.ProductStock.find({
        productID: { '$in': products },
      }).session(session);

      // console.log(foundProducts, 'fp');//

      for (const product of foundProducts) {
        // console.log(product._id.toString());
        const count = productCountMap[product.productID.toString()];

        // console.log(count, 'count ++');
        if (product.total - count <= 0) {
          this.ctx.throw(400, 'no enough stock');
          return;
        }

        // product.total = product.total
        await model.ProductStock.update({
          productID: product.productID,
        }, {
          '$inc': {
            total: -count,
          },
        }).session(session);
      }
      await createdSale.save({ session });
      await session.commitTransaction();
      session.endSession();

      return createdSale;
    } catch (error) {
      await session.abortTransaction();
      session.endSession();
      this.ctx.throw(400, error);
      // console.error(error);
      return {};
    }
  }

  async delRecord(id: string): Promise<boolean> {
    console.log(id, 'id ....');
    const { model, app: { mongooseDB } } = this.ctx;

    const client = getMainConnection(mongooseDB);

    const session = await client.startSession();
    session.startTransaction();
    try {
      const foundSaleOrder = await model.Sale.findOne({
        _id: id,
      }).session(session);
      if (!foundSaleOrder) {
        this.ctx.throw(404, 'not found this sale order');
      }
      const { productsCount } = foundSaleOrder;
      for (const saleOrder of productsCount) {
        // product.total = product.total
        await model.ProductStock.update({
          productID: saleOrder.id,
        }, {
          '$inc': {
            total: +saleOrder.count,
          },
        }).session(session);
      }
      await model.Sale.update({
        _id: id,
      }, {
        deleted: true,
      }).session(session);
      await session.commitTransaction();
      session.endSession();
      return true;
    } catch (error) {
      await session.abortTransaction();
      session.endSession();
      this.ctx.throw(400, error);
      return false;
    }
    
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
      const searchReg = new RegExp(query.search, 'i')
      const users = await model.Customer.find({
        name: searchReg,
      });
      const products = await model.Product.find({
        name: searchReg,
      });

      const userIDs = users.map(u => u.id);
      const productIDs = products.map(u => u.id);
      
      condition['$or'] = [
        
        {'customer': {'$in': userIDs}},
        {'products': {'$in': productIDs}},
        
      ]
    }

    const listResults = await pagedResultBuild<ISale>(model.Sale, condition, (mdl) => {
      return mdl.populate('products').populate('customer');
    });

    return listResults;
  }
}