// This file is created by egg-ts-helper@1.25.6
// Do not modify this file!!!!!!!!!

import 'egg';
import ExportAccess from '../../../app/service/Access';
import ExportAccessGroup from '../../../app/service/AccessGroup';
import ExportCategory from '../../../app/service/Category';
import ExportCustomer from '../../../app/service/Customer';
import ExportEmployee from '../../../app/service/Employee';
import ExportEnterprise from '../../../app/service/Enterprise';
import ExportFinance from '../../../app/service/Finance';
import ExportFinanceCategory from '../../../app/service/FinanceCategory';
import ExportIDcard from '../../../app/service/IDcard';
import ExportMember from '../../../app/service/Member';
import ExportOptometry from '../../../app/service/Optometry';
import ExportOrder from '../../../app/service/Order';
import ExportProduct from '../../../app/service/Product';
import ExportProvider from '../../../app/service/Provider';
import ExportSale from '../../../app/service/Sale';
import ExportShopCart from '../../../app/service/ShopCart';
import ExportStock from '../../../app/service/Stock';
import ExportTest from '../../../app/service/Test';
import ExportUser from '../../../app/service/User';

declare module 'egg' {
  interface IService {
    access: ExportAccess;
    accessGroup: ExportAccessGroup;
    category: ExportCategory;
    customer: ExportCustomer;
    employee: ExportEmployee;
    enterprise: ExportEnterprise;
    finance: ExportFinance;
    financeCategory: ExportFinanceCategory;
    iDcard: ExportIDcard;
    member: ExportMember;
    optometry: ExportOptometry;
    order: ExportOrder;
    product: ExportProduct;
    provider: ExportProvider;
    sale: ExportSale;
    shopCart: ExportShopCart;
    stock: ExportStock;
    test: ExportTest;
    user: ExportUser;
  }
}
