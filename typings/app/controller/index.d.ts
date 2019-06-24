// This file is created by egg-ts-helper@1.25.2
// Do not modify this file!!!!!!!!!

import 'egg';
import ExportCustomer from '../../../app/controller/Customer';
import ExportFinance from '../../../app/controller/Finance';
import ExportFinanceCategory from '../../../app/controller/FinanceCategory';
import ExportOptometry from '../../../app/controller/Optometry';
import ExportProduct from '../../../app/controller/Product';
import ExportProvider from '../../../app/controller/Provider';
import ExportRelease from '../../../app/controller/Release';
import ExportSale from '../../../app/controller/Sale';
import ExportStock from '../../../app/controller/Stock';
import ExportUser from '../../../app/controller/User';
import ExportHome from '../../../app/controller/home';

declare module 'egg' {
  interface IController {
    customer: ExportCustomer;
    finance: ExportFinance;
    financeCategory: ExportFinanceCategory;
    optometry: ExportOptometry;
    product: ExportProduct;
    provider: ExportProvider;
    release: ExportRelease;
    sale: ExportSale;
    stock: ExportStock;
    user: ExportUser;
    home: ExportHome;
  }
}
