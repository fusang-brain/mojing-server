// This file is created by egg-ts-helper@1.25.6
// Do not modify this file!!!!!!!!!

import 'egg';
import ExportAccess from '../../../app/service/Access';
import ExportAccessGroup from '../../../app/service/AccessGroup';
import ExportCustomer from '../../../app/service/Customer';
import ExportEmployee from '../../../app/service/Employee';
import ExportEnterprise from '../../../app/service/Enterprise';
import ExportFinance from '../../../app/service/Finance';
import ExportFinanceCategory from '../../../app/service/FinanceCategory';
import ExportOptometry from '../../../app/service/Optometry';
import ExportProduct from '../../../app/service/Product';
import ExportProvider from '../../../app/service/Provider';
import ExportSale from '../../../app/service/Sale';
import ExportStock from '../../../app/service/Stock';
import ExportTest from '../../../app/service/Test';
import ExportUser from '../../../app/service/User';

declare module 'egg' {
  interface IService {
    access: ExportAccess;
    accessGroup: ExportAccessGroup;
    customer: ExportCustomer;
    employee: ExportEmployee;
    enterprise: ExportEnterprise;
    finance: ExportFinance;
    financeCategory: ExportFinanceCategory;
    optometry: ExportOptometry;
    product: ExportProduct;
    provider: ExportProvider;
    sale: ExportSale;
    stock: ExportStock;
    test: ExportTest;
    user: ExportUser;
  }
}
