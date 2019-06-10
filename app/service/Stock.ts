import { Service } from 'egg';
import { pagedResultBuild } from '../common/query.model';
import { IStockOrder } from '../model/StockOrder';
import { IOutStockOrder } from '../model/OutStockOrder';

export default class StockService extends Service {

  async createOrder(body: IDict) {
    const { ctx } = this;
    const { model } = ctx;

    return model.StockOrder.create(body);
  }

  async createOutStockOrder(body: IDict) {
    const { ctx } = this;
    const { model } = ctx;

    return model.OutStockOrder.create(body);
  }

  async updateOrder(body: IDict) {
    const { _id, ...restBody } = body;
    const { ctx } = this;
    const { model } = ctx;
    await model.StockOrder.update({
      _id,
    }, restBody);

    return model.StockOrder.findOne({
      _id,
    });
  }

  async updateOutStockOrder(body: IDict) {
    const { _id, ...restBody } = body;
    const { ctx } = this;
    const { model } = ctx;
    await model.OutStockOrder.update({
      _id,
    }, restBody);

    return model.OutStockOrder.findOne({
      _id,
    });
  }

  async findOrders(query: Query) {
    const { ctx } = this;

    const { model } = ctx;

    return await pagedResultBuild<IStockOrder>(model.StockOrder, query, (queries) => {
      return queries.populate('checkerObj').sort([['inStockTime', -1], ['createdAt', -1]]);
    });
  }

  async findOutStockOrders(query: Query) {
    const { ctx } = this;

    const { model } = ctx;

    return await pagedResultBuild<IOutStockOrder>(model.OutStockOrder, query, (queries) => {
      return queries.populate('checkerObj').sort([['outStockTime', -1], ['createdAt', -1]]);;
    });
  }

  async setOutStockItems(items: Array<any>, orderID: ObjectID) {
    const { model } = this.ctx;

    const foundOrder = await model.OutStockOrder.findOne({
      _id: orderID,
    });

    if (!foundOrder) {
      this.ctx.throw('404', 'not found this instock order');
    }

    if (foundOrder.currentStep !== 2) {
      foundOrder.currentStep = 2;
      await foundOrder.save();
    }

    const createdItems = await model.OutStockOrderItem.insertMany(items);

    return createdItems;
  }

  async setStockItems(items: Array<any>, orderID: ObjectID) {
    const { model } = this.ctx;

    const foundOrder = await model.StockOrder.findOne({
      _id: orderID,
    });

    if (!foundOrder) {
      this.ctx.throw('404', 'not found this instock order');
    }

    if (foundOrder.currentStep !== 2) {
      foundOrder.currentStep = 2;
      await foundOrder.save();
    }

    const createdItems = await model.StockOrderItem.insertMany(items);

    return createdItems;
  }

  async findStockItemsByOrderID(query: Query) {
    const { ctx } = this;
    const { model } = ctx;
    const { orderID } = query;
    const items  = await model.StockOrderItem.find({
      orderID: orderID,
      deleted: false,
    }).populate('productInfo').populate('productBatchInfo');

    return items;
  }

  async findOutStockItemsByOrderID(query: Query) {
    const { ctx } = this;
    const { model } = ctx;
    const { orderID } = query;

    const items  = await model.OutStockOrderItem.find({
      orderID: orderID,
      deleted: false,
    }).populate('productInfo').populate('productBatchInfo');

    return items;
  }

  async checkedAllOutStockItems(orderID: ObjectID) {
    const { ctx } = this;
    const { model } = ctx;
    const items = await model.OutStockOrderItem.find({
      orderID: orderID,
      deleted: false,
      checkDate: { $eq: null },
    });
    const results = [];
    for (const item of items) {
      if (item) {
        item.checkQualifiedCount = item.total;
        item.checkDate = new Date();
        item.checkResult = 'checked';
        await item.save();
        results.push(item);
      }
    }

    return results;
  }

  async checkedAll(orderID: ObjectID) {
    const { ctx } = this;
    const { model } = ctx;
    const items = await model.StockOrderItem.find({
      orderID: orderID,
      deleted: false,
      checkDate: { $eq: null },
    });
    const results = [];
    for (const item of items) {
      if (item) {
        item.checkQualifiedCount = item.total;
        item.checkDate = new Date();
        item.checkResult = 'checked';
        await item.save();
        results.push(item);
      }
    }

    return results;
  }

  async checkOneOutStockItem(body: IDict) {
    const { ctx } = this;
    const { model } = ctx;
    const { itemID, orderID, checkQualifiedCount = 0 } = body;

    const foundItem = await model.OutStockOrderItem.findOne({
      deleted: false,
      orderID: orderID,
      _id: itemID,
    });

    if (!foundItem) {
      ctx.throw(404, 'not found this item');
      return;
    }

    foundItem.checkQualifiedCount = checkQualifiedCount;
    foundItem.checkDate = new Date();
    foundItem.checkResult = 'checked';
    await foundItem.save();

    return foundItem;
  }

  async checkOneItem(body: IDict) {
    const { ctx } = this;
    const { model } = ctx;
    const { itemID, orderID, checkQualifiedCount = 0 } = body;

    const foundItem = await model.StockOrderItem.findOne({
      deleted: false,
      orderID: orderID,
      _id: itemID,
    });

    if (!foundItem) {
      ctx.throw(404, 'not found this item');
      return;
    }

    foundItem.checkQualifiedCount = checkQualifiedCount;
    foundItem.checkDate = new Date();
    foundItem.checkResult = 'checked';
    await foundItem.save();

    return foundItem;
  }

  async instock(orderID?: ObjectID, enterprise?: ObjectID) {
    const { ctx } = this;
    const { model } = ctx;

    const items = await model.StockOrderItem.find({
      orderID: orderID,
    });

    const foundProduct = await model.StockOrder.findOne({
      _id: orderID,
    });

    if (!foundProduct) {
      ctx.throw(404, 'not found this product');
      return;
    }

    foundProduct.currentStep = 3;

    const instockProducts: any[] = [];

    for (const item of items) {
      const foundCount = await model.ProductStock.count({
        enterprise,
        productID: item.productID,
        productBatchID: item.productBatchID,
      });

      if (foundCount > 0) {
        await model.ProductStock.findOneAndUpdate({
          enterprise,
          productID: item.productID,
          productBatchID: item.productBatchID,
        }, {
          $inc: {'total': item.total }
        });
        continue;
      }

      instockProducts.push({
        enterprise,
        productID: item.productID,
        productBatchID: item.productBatchID,
        total: item.checkQualifiedCount,
      });
    }
    
    const products = await model.ProductStock.insertMany(instockProducts);
    await foundProduct.save();
    return products;
  }

  async outstock(orderID?: ObjectID, enterprise?: ObjectID) {
    const { ctx } = this;
    const { model } = ctx;

    const items = await model.OutStockOrderItem.find({
      orderID: orderID,
    });

    const foundProduct = await model.OutStockOrder.findOne({
      _id: orderID,
    });

    if (!foundProduct) {
      ctx.throw(404, 'not found this product');
      return;
    }

    foundProduct.currentStep = 3;

    const instockProducts: any[] = [];

    for (const item of items) {
      const foundCount = await model.ProductStock.count({
        enterprise,
        productID: item.productID,
        productBatchID: item.productBatchID,
      });

      if (foundCount > 0) {
        instockProducts.push(item);
        await model.ProductStock.findOneAndUpdate({
          enterprise,
          productID: item.productID,
          productBatchID: item.productBatchID,
        }, {
          $inc: {'total': -item.checkQualifiedCount }
        });
        continue;
      }

      // instockProducts.push({
      //   enterprise,
      //   productID: item.productID,
      //   productBatchID: item.productBatchID,
      //   total: item.checkQualifiedCount,
      // });
    }
    
    // const products = await model.ProductStock.insertMany(instockProducts);
    await foundProduct.save();
    return instockProducts;
  }
}