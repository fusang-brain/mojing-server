import { Application } from 'egg';
import { routerWrapper } from '@fsba/egg-wrapper';
export default (app: Application) => {
  // const { controller, router } = app;
  routerWrapper(app, {
    swaggerHtmlEndpoint: '/docs',
    swaggerJsonEndpoint: '/docs/swagger-json',
    makeswaggerRouter: false,
    title: 'MoJing+',
    version: 'v1.0.0',
    description: 'API',
  });

  // router.get('/', controller.home.index);
  // router.get('/welcome', controller.home.index);
  // router.resources('finance', '/finance', controller.finance);
  // router.get('/finance/statistic', controller.finance.findStatistic);
  // router.resources('finance_category', '/finance_category', controller.financeCategory);
  // router.post('/user/register', controller.user.register);
  // router.post('/user/login', controller.user.login);
  // router.get('/user/operators', controller.user.operators);
  // router.get('/user/info', controller.user.info);
  
  // router.get('/product/stockList', controller.product.findProductStockList);
  // router.get('/product/batches', controller.product.findBatchsByProductID);
  // router.get('/product/simpleList', controller.product.findSimpleProductList);
  // router.post('/product/createBatch', controller.product.createBatch);
  // router.resources('product', '/product', controller.product);
  
  // router.get('/stock/findOrderItems', controller.stock.loadStockItemsByOrderID);
  // router.get('/stock/findOutStockOrderItems', controller.stock.loadOutStockItemsByOrderID)
  // router.get('/stock/findOrders', controller.stock.findOrders);
  // router.get('/stock/findOutStockOrders', controller.stock.findOutStockOrders);
  // router.resources('stock', '/stock', controller.stock);
  // router.post('/stock/createOrder', controller.stock.createStockOrder);
  // router.post('/stock/createOutStockOrder', controller.stock.createOutStockOrder);
  // router.post('/stock/setStockItems', controller.stock.setStockItems);
  // router.post('/stock/setOutStockItems', controller.stock.setOutStockItems);
  // router.put('/stock/updateOrder', controller.stock.updateOrder);
  // router.put('/stock/updateOutStockOrder', controller.stock.updateOutStockOrder);
  // router.put('/stock/checkOneOrderItem', controller.stock.checkOneItem);
  // router.put('/stock/checkOneOutStockOrderItem', controller.stock.checkOneOutStockItem);
  // router.put('/stock/checkedAllOrderItems', controller.stock.checkedAll);
  // router.put('/stock/checkedAllOutStockOrderItems', controller.stock.checkedAllOutStockItems);
  // router.post('/stock/instock', controller.stock.instock);
  // router.post('/stock/outstock', controller.stock.outstock);

  // router.resources('Provider', '/provider', controller.provider);

  // router.get('/customer/findCustomers', controller.customer.getCustomerList);
  // router.resources('Customer', '/customer', controller.customer);
  
  // router.resources('Optometry', '/optometry', controller.optometry);

  // router.get('/release', controller.release.info);

  // router.delete('/sale/del', controller.sale.del);
  // router.resources('Sale', '/sale', controller.sale);

  // router.resources('Employee', '/employee', controller.employee);
  // router.resources('AccessGroup', '/accessGroup', controller.accessGroup);
  // router.put('/accessGroup/add-access/:id', controller.accessGroup.addAccessToGroup);
  // router.get('/accessGroup/accesses/:id', controller.accessGroup.findGroupAccesses);

  // router.post('/access/', controller.access.createAccess);
  // router.get('/access/', controller.access.getAllAccess);
  // router.delete('/access/:id', controller.access.removeAccess);

  // router.post('/enterprise', controller.enterprise.simpleCreate);
  // router.get('/enterprise/:id', controller.enterprise.details);
  // router.get('/enterprise/', controller.enterprise.index);
  // router.put('/enterprise/:id', controller.enterprise.update);
  // router.delete('/enterprise/:id', controller.enterprise.remove);
  // router.get('/enterprise/by-user/:id', controller.enterprise.findListByUserID);

  // router.put('/sms/validateCode/:phoneNumber/k/:kind', controller.sms.sendValidateCode);
  
};
