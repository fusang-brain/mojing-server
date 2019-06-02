// This file is created by egg-ts-helper@1.25.2
// Do not modify this file!!!!!!!!!

import 'egg';
import ExportAccess from '../../../app/model/Access';
import ExportAuthorization from '../../../app/model/Authorization';
import ExportCustomer from '../../../app/model/Customer';
import ExportEnterprise from '../../../app/model/Enterprise';
import ExportFinance from '../../../app/model/Finance';
import ExportFinanceCategory from '../../../app/model/FinanceCategory';
import ExportOptometry from '../../../app/model/Optometry';
import ExportOrganization from '../../../app/model/Organization';
import ExportOutStockOrder from '../../../app/model/OutStockOrder';
import ExportOutStockOrderItem from '../../../app/model/OutStockOrderItem';
import ExportProduct from '../../../app/model/Product';
import ExportProductStock from '../../../app/model/ProductStock';
import ExportProductionBatch from '../../../app/model/ProductionBatch';
import ExportProvider from '../../../app/model/Provider';
import ExportRole from '../../../app/model/Role';
import ExportStockOrder from '../../../app/model/StockOrder';
import ExportStockOrderItem from '../../../app/model/StockOrderItem';
import ExportUser from '../../../app/model/User';
import ExportUserRole from '../../../app/model/UserRole';

declare module 'egg' {
  interface IModel {
    Access: ReturnType<typeof ExportAccess>;
    Authorization: ReturnType<typeof ExportAuthorization>;
    Customer: ReturnType<typeof ExportCustomer>;
    Enterprise: ReturnType<typeof ExportEnterprise>;
    Finance: ReturnType<typeof ExportFinance>;
    FinanceCategory: ReturnType<typeof ExportFinanceCategory>;
    Optometry: ReturnType<typeof ExportOptometry>;
    Organization: ReturnType<typeof ExportOrganization>;
    OutStockOrder: ReturnType<typeof ExportOutStockOrder>;
    OutStockOrderItem: ReturnType<typeof ExportOutStockOrderItem>;
    Product: ReturnType<typeof ExportProduct>;
    ProductStock: ReturnType<typeof ExportProductStock>;
    ProductionBatch: ReturnType<typeof ExportProductionBatch>;
    Provider: ReturnType<typeof ExportProvider>;
    Role: ReturnType<typeof ExportRole>;
    StockOrder: ReturnType<typeof ExportStockOrder>;
    StockOrderItem: ReturnType<typeof ExportStockOrderItem>;
    User: ReturnType<typeof ExportUser>;
    UserRole: ReturnType<typeof ExportUserRole>;
  }
}
