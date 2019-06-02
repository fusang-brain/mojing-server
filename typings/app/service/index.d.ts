// This file is created by egg-ts-helper@1.25.2
// Do not modify this file!!!!!!!!!

import 'egg';
import ExportCustomer from '../../../app/service/Customer';
import ExportFinance from '../../../app/service/Finance';
import ExportFinanceCategory from '../../../app/service/FinanceCategory';
import ExportOptometry from '../../../app/service/Optometry';
import ExportProduct from '../../../app/service/Product';
import ExportProvider from '../../../app/service/Provider';
import ExportStock from '../../../app/service/Stock';
import ExportTest from '../../../app/service/Test';
import ExportUser from '../../../app/service/User';

declare module 'egg' {
  interface IService {
    customer: ExportCustomer;
    finance: ExportFinance;
    financeCategory: ExportFinanceCategory;
    optometry: ExportOptometry;
    product: ExportProduct;
    provider: ExportProvider;
    stock: ExportStock;
    test: ExportTest;
    user: ExportUser;
  }
}
