import { Products } from '../model/ShopCart';
//购物车->批量商品同步
export interface PutShopCartDTO {
    memberId?: ObjectID;
    productList: Products[];
}
//购物车->单个商品添加
export interface ShopCartDTO {
    shopCartId?: ObjectID;
    memberId?: ObjectID;
    productId?: ObjectID;
    count?: number;
}


