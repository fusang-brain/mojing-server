// This file is created by egg-ts-helper@1.25.2
// Do not modify this file!!!!!!!!!

import 'egg';
import ExportAccess from '../../../app/controller/Access';
import ExportAccessGroup from '../../../app/controller/AccessGroup';
import ExportCustomer from '../../../app/controller/Customer';
import ExportEmployee from '../../../app/controller/Employee';
import ExportEnterprise from '../../../app/controller/Enterprise';
import ExportFinance from '../../../app/controller/Finance';
import ExportFinanceCategory from '../../../app/controller/FinanceCategory';
import ExportOptometry from '../../../app/controller/Optometry';
import ExportProduct from '../../../app/controller/Product';
import ExportProvider from '../../../app/controller/Provider';
import ExportRelease from '../../../app/controller/Release';
import ExportSms from '../../../app/controller/Sms';
import ExportSale from '../../../app/controller/Sale';
import ExportStock from '../../../app/controller/Stock';
import ExportUser from '../../../app/controller/User';
import ExportHome from '../../../app/controller/home';

declare module 'egg' {
  interface IController {
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
    release: ExportRelease;
    sms: ExportSms;
    sale: ExportSale;
    stock: ExportStock;
    user: ExportUser;
    home: ExportHome;
  }
}
