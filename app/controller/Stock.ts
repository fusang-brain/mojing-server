
import { Controller } from 'egg';
// import { validateBody } from '../common/query.model';
import { request, summary, query, tag, queryWithPager, body } from '@fsba/egg-wrapper';

const Tag = tag('库存模块')

export default class StockController extends Controller {

  // @validateBody({
  //   orderNO: 'string',
  //   title: { type: 'string', required: false },
  //   inStockTime: { type: 'dateTime', required: false },
  //   provider: { type: 'string', required: true },
  //   checker: { type: 'ObjectId', required: true },
  //   stock: { type: 'string', required: true },
  //   note: { type: 'string', required: false },
  //   enterprise: 'string',
  // })
  @request('post', '/stock/createOrder')
  @summary('创建库存订单')
  @Tag
  @body({
    orderNO: 'string',
    title: { type: 'string', required: false },
    inStockTime: { type: 'dateTime', required: false },
    provider: { type: 'string', required: true },
    checker: { type: 'ObjectId', required: true },
    stock: { type: 'string', required: true },
    note: { type: 'string', required: false },
    // enterprise: 'string',
  })
  async createStockOrder() {
    const { ctx } = this;
    const { service, request } = ctx;

    const order = await service.stock.createOrder(request.body);

    ctx.status = 201;
    ctx.body = {
      order,
    };
  }

  // @validateBody({
  //   orderNO: 'string',
  //   title: { type: 'string', required: false },
  //   outStockTime: { type: 'dateTime', required: false },
  //   customer: { type: 'string', required: true },
  //   checker: { type: 'ObjectId', required: true },
  //   stock: { type: 'string', required: true },
  //   note: { type: 'string', required: false },
  //   enterprise: 'string',
  // })
  @request('post', '/stock/createOutStockOrder')
  @summary('创建出库订单')
  @Tag
  @body({
    orderNO: 'string',
    title: { type: 'string', required: false },
    outStockTime: { type: 'dateTime', required: false },
    customer: { type: 'string', required: true },
    checker: { type: 'ObjectId', required: true },
    stock: { type: 'string', required: true },
    note: { type: 'string', required: false },
    // enterprise: 'string',
  })
  async createOutStockOrder() {
    const { ctx } = this;
    const { service, request } = ctx;

    const order = await service.stock.createOutStockOrder(request.body);

    ctx.status = 201;
    ctx.body = {
      order,
    };
  }

  // @validateQueryWithPager({
  //   enterprise: 'ObjectId',
  // })
  @request('get', '/stock/findOrders')
  @Tag
  @queryWithPager()
  async findOrders() {
    const { ctx } = this;
    const { service } = ctx;
    ctx.request.query.enterprise = ctx.enterprise;
    const resp = await service.stock.findOrders(ctx.request.query);
    ctx.body = resp;
  }

  // @validateQueryWithPager({
  //   enterprise: 'ObjectId',
  // })
  @request('get', '/stock/findOutStockOrders')
  @Tag
  @queryWithPager()
  async findOutStockOrders() {
    const { ctx } = this;
    const { service } = ctx;
    ctx.request.query.enterprise = ctx.enterprise;
    const resp = await service.stock.findOutStockOrders(ctx.request.query);
    ctx.body = resp;
  }

  // @validateBody({
  //   _id: 'string',
  //   orderNO: 'string',
  //   title: { type: 'string', required: false },
  //   inStockTime: { type: 'dateTime', required: false },
  //   provider: { type: 'string', required: true },
  //   checker: { type: 'ObjectId', required: true },
  //   stock: { type: 'string', required: true },
  //   note: { type: 'string', required: false },
  //   enterprise: 'string',
  // })
  @request('post', '/stock/updateOrder')
  @summary('修改库存项目')
  @Tag
  @body({
    _id: 'string',
    orderNO: 'string',
    title: { type: 'string', required: false },
    inStockTime: { type: 'dateTime', required: false },
    provider: { type: 'string', required: true },
    checker: { type: 'ObjectId', required: true },
    stock: { type: 'string', required: true },
    note: { type: 'string', required: false },
    // enterprise: 'string',
  })
  async updateOrder() {
    const { ctx } = this;
    const { service, request } = ctx;

    const order = await service.stock.updateOrder(request.body);

    ctx.status = 201;
    ctx.body = {
      order,
    };
  }

  // @validateBody({
  //   _id: 'string',
  //   orderNO: 'string',
  //   title: { type: 'string', required: false },
  //   outStockTime: { type: 'dateTime', required: false },
  //   customer: { type: 'string', required: true },
  //   checker: { type: 'ObjectId', required: true },
  //   stock: { type: 'string', required: true },
  //   note: { type: 'string', required: false },
  //   enterprise: 'string',
  // })
  @request('post', '/stock/updateOutStockOrder')
  @summary('修改出库单')
  @Tag
  @body({
    _id: 'string',
    orderNO: 'string',
    title: { type: 'string', required: false },
    outStockTime: { type: 'dateTime', required: false },
    customer: { type: 'string', required: true },
    checker: { type: 'ObjectId', required: true },
    stock: { type: 'string', required: true },
    note: { type: 'string', required: false },
    // enterprise: 'string',
  })
  async updateOutStockOrder() {
    const { ctx } = this;
    const { service, request } = ctx;

    const order = await service.stock.updateOutStockOrder(request.body);

    ctx.status = 201;
    ctx.body = {
      order,
    };
  }

  // @validateBody({
  //   orderID: {
  //     type: 'ObjectId',
  //     required: true,
  //   },
  //   items: { 
  //     type: 'array',
  //     itemType: 'object',
  //     rule: {
  //       orderID: 'ObjectId',
  //       productID: 'ObjectId',
  //       productBatchID: {
  //         type: 'ObjectId',
  //         required: false,
  //       },
  //     },
  //   }
  // })
  @request('post', '/stock/setStockItems')
  @summary('设置库存项目')
  @Tag
  @body({
    orderID: {
      type: 'ObjectId',
      required: true,
    },
    items: { 
      type: 'array',
      itemType: 'object',
      rule: {
        orderID: 'ObjectId',
        productID: 'ObjectId',
        productBatchID: {
          type: 'ObjectId',
          required: false,
        },
      },
    }
  })
  async setStockItems() {
    const { ctx } = this;
    const { service } = ctx;
    const { items, orderID } = ctx.request.body;
    const createdItems = await service.stock.setStockItems(items, orderID);

    ctx.status = 201;
    ctx.body = createdItems;
  }

  // @validateBody({
  //   orderID: {
  //     type: 'ObjectId',
  //     required: true,
  //   },
  //   items: { 
  //     type: 'array',
  //     itemType: 'object',
  //     rule: {
  //       orderID: 'ObjectId',
  //       productID: 'ObjectId',
  //       productBatchID: {
  //         type: 'ObjectId',
  //         required: false,
  //       },
  //     },
  //   }
  // })
  @request('post', '/stock/setOutStockItems')
  @summary('设置出库项目')
  @Tag
  @body({
    orderID: {
      type: 'ObjectId',
      required: true,
    },
    items: { 
      type: 'array',
      itemType: 'object',
      rule: {
        orderID: 'ObjectId',
        productID: 'ObjectId',
        productBatchID: {
          type: 'ObjectId',
          required: false,
        },
      },
    }
  })
  async setOutStockItems() {
    const { ctx } = this;
    const { service } = ctx;
    const { items, orderID } = ctx.request.body;
    const createdItems = await service.stock.setOutStockItems(items, orderID);

    ctx.status = 201;
    ctx.body = createdItems;
  }

  // @validateQuery({
  //   orderID: {
  //     type: 'ObjectId',
  //     required: false,
  //   },
  // })
  @request('get', '/stock/findOrderItems')
  @summary('查询订单项')
  @Tag
  @query({
    orderID: { type: 'ObjectId', required: false }
  })
  async loadStockItemsByOrderID() {
    const { ctx } = this;

    const items = await ctx.service.stock.findStockItemsByOrderID(ctx.request.query);

    ctx.body = items.map(item => ({
      ...item.toJSON(),
      productName: item.productInfo ? item.productInfo.name : '--',
      productBatchNumber: item.productBatchInfo ? item.productBatchInfo.batchNumber : '--',
    }));
  }

  // @validateQuery({
  //   orderID: {
  //     type: 'ObjectId',
  //     required: false,
  //   },
  // })
  @request('get', '/stock/findOutStockOrderItems')
  @summary('查询出库订单项')
  @Tag
  @query({
    orderID: { type: 'ObjectId', required: false }
  })
  async loadOutStockItemsByOrderID() {
    const { ctx } = this;

    const items = await ctx.service.stock.findOutStockItemsByOrderID(ctx.request.query);

    ctx.body = items.map(item => ({
      ...item.toJSON(),
      productName: item.productInfo ? item.productInfo.name : '--',
      productBatchNumber: item.productBatchInfo ? item.productBatchInfo.batchNumber : '--',
    }));
  }

  // @validateBody({
  //   orderID: {
  //     type: 'ObjectId',
  //     required: true,
  //   },
  //   itemID: {
  //     type: 'ObjectId',
  //     required: true,
  //   },
  //   checkQualifiedCount: {
  //     type: 'number',
  //     required: true,
  //   },
  // })
  @request('post', '/stock/checkOneOrderItem')
  @summary('验收一个订单项')
  @Tag
  @body({
    orderID: {
      type: 'ObjectId',
      required: true,
    },
    itemID: {
      type: 'ObjectId',
      required: true,
    },
    checkQualifiedCount: {
      type: 'number',
      required: true,
    },
  })
  async checkOneItem() {
    const { ctx } = this;
    const { service } = ctx;
    await service.stock.checkOneItem(ctx.request.body);

    ctx.body = ctx.request.body;
  }

  @request('post', '/stock/checkOneOutStockOrderItem')
  @summary('验收一个出库订单项')
  @Tag
  @body({
    orderID: {
      type: 'ObjectId',
      required: true,
    },
    itemID: {
      type: 'ObjectId',
      required: true,
    },
    checkQualifiedCount: {
      type: 'number',
      required: true,
    },
  })
  async checkOneOutStockItem() {
    const { ctx } = this;
    const { service } = ctx;
    await service.stock.checkOneOutStockItem(ctx.request.body);

    ctx.body = ctx.request.body;
  }

  // @validateBody({
  //   orderID: {
  //     type: 'ObjectId',
  //     required: true,
  //   }
  // })

  @request('post', '/stock/checkedAllOrderItems')
  @summary('验收所有入库订单')
  @Tag
  @body({
    orderID: {
      type: 'ObjectId',
      required: true,
    }
  })
  async checkedAll() {
    const { ctx } = this;
    const { service } = ctx;
    const res = await service.stock.checkedAll(ctx.request.body.orderID);

    ctx.body = res.map(item => item._id);
  }

  // @validateBody({
  //   orderID: {
  //     type: 'ObjectId',
  //     required: true,
  //   }
  // })
  @request('post', '/stock/checkedAllOutStockOrderItems')
  @summary('验收所有出库订单')
  @Tag
  @body({
    orderID: {
      type: 'ObjectId',
      required: true,
    }
  })
  async checkedAllOutStockItems() {
    const { ctx } = this;
    const { service } = ctx;
    const res = await service.stock.checkedAllOutStockItems(ctx.request.body.orderID);

    ctx.body = res.map(item => item._id);
  }

  // @validateBody({
  //   orderID: {
  //     type: 'ObjectId',
  //     required: true,
  //   },
  // })
  @request('post', '/stock/instock')
  @summary('入库')
  @Tag
  @body({
    orderID: {
      type: 'ObjectId',
      required: true,
    }
  })
  async instock() {
    const { ctx } = this;
    const { service, request, enterprise } = ctx;
    const { orderID } = request.body;
    const res = await service.stock.instock(orderID, enterprise);

    ctx.body = res;
    ctx.status = 201;
  }

  // @validateBody({
  //   orderID: {
  //     type: 'ObjectId',
  //     required: true,
  //   },
  // })
  @request('post', '/stock/outstock')
  @summary('出库')
  @Tag
  @body({
    orderID: {
      type: 'ObjectId',
      required: true,
    }
  })
  async outstock() {
    const { ctx } = this;
    const { service, request, enterprise } = ctx;
    const { orderID } = request.body;
    const res = await service.stock.outstock(orderID, enterprise);

    ctx.body = res;
    ctx.status = 201;
  }
}