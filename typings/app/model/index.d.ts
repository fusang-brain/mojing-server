// This file is created by egg-ts-helper@1.25.6
// Do not modify this file!!!!!!!!!

import 'egg';
import ExportAccess from '../../../app/model/Access';
import ExportAccessGroup from '../../../app/model/AccessGroup';
import ExportAccessGroupRelate from '../../../app/model/AccessGroupRelate';
import ExportAuthorization from '../../../app/model/Authorization';
import ExportCryptogram from '../../../app/model/Cryptogram';
import ExportCustomer from '../../../app/model/Customer';
import ExportEmployee from '../../../app/model/Employee';
import ExportEmployeeAccess from '../../../app/model/EmployeeAccess';
import ExportEnterprise from '../../../app/model/Enterprise';
import ExportEnterpriseLicenseRecord from '../../../app/model/EnterpriseLicenseRecord';
import ExportEnterprisePayment from '../../../app/model/EnterprisePayment';
import ExportFinance from '../../../app/model/Finance';
import ExportFinanceCategory from '../../../app/model/FinanceCategory';
import ExportLog from '../../../app/model/Log';
import ExportMember from '../../../app/model/Member';
import ExportOptometry from '../../../app/model/Optometry';
import ExportOrganization from '../../../app/model/Organization';
import ExportOutStockOrder from '../../../app/model/OutStockOrder';
import ExportOutStockOrderItem from '../../../app/model/OutStockOrderItem';
import ExportProduct from '../../../app/model/Product';
import ExportProductionBatch from '../../../app/model/ProductionBatch';
import ExportProductStock from '../../../app/model/ProductStock';
import ExportProvider from '../../../app/model/Provider';
import ExportSale from '../../../app/model/Sale';
import ExportShopCart from '../../../app/model/ShopCart';
import ExportStockOrder from '../../../app/model/StockOrder';
import ExportStockOrderItem from '../../../app/model/StockOrderItem';
import ExportUser from '../../../app/model/User';

declare module 'egg' {
  interface IModel {
    Access: ReturnType<typeof ExportAccess>;
    AccessGroup: ReturnType<typeof ExportAccessGroup>;
    AccessGroupRelate: ReturnType<typeof ExportAccessGroupRelate>;
    Authorization: ReturnType<typeof ExportAuthorization>;
    Cryptogram: ReturnType<typeof ExportCryptogram>;
    Customer: ReturnType<typeof ExportCustomer>;
    Employee: ReturnType<typeof ExportEmployee>;
    EmployeeAccess: ReturnType<typeof ExportEmployeeAccess>;
    Enterprise: ReturnType<typeof ExportEnterprise>;
    EnterpriseLicenseRecord: ReturnType<typeof ExportEnterpriseLicenseRecord>;
    EnterprisePayment: ReturnType<typeof ExportEnterprisePayment>;
    Finance: ReturnType<typeof ExportFinance>;
    FinanceCategory: ReturnType<typeof ExportFinanceCategory>;
    Log: ReturnType<typeof ExportLog>;
    Member: ReturnType<typeof ExportMember>;
    Optometry: ReturnType<typeof ExportOptometry>;
    Organization: ReturnType<typeof ExportOrganization>;
    OutStockOrder: ReturnType<typeof ExportOutStockOrder>;
    OutStockOrderItem: ReturnType<typeof ExportOutStockOrderItem>;
    Product: ReturnType<typeof ExportProduct>;
    ProductionBatch: ReturnType<typeof ExportProductionBatch>;
    ProductStock: ReturnType<typeof ExportProductStock>;
    Provider: ReturnType<typeof ExportProvider>;
    Sale: ReturnType<typeof ExportSale>;
    ShopCart: ReturnType<typeof ExportShopCart>;
    StockOrder: ReturnType<typeof ExportStockOrder>;
    StockOrderItem: ReturnType<typeof ExportStockOrderItem>;
    User: ReturnType<typeof ExportUser>;
  }
}
