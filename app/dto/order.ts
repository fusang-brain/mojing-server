import { Products } from '../model/ShopCart';

export interface OrderDTO {
    shopCartId?:ObjectID;
    memberId?:ObjectID;
    address?:ObjectID;
    logistics?:ObjectID;
    productList:Products[];
  }