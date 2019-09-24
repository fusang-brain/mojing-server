import { BaseDocument } from '../common/mongo.base';
import { Schema } from 'mongoose';
import { Application } from 'egg';
import { defaultFieldsPlugin } from '../common/mongo.plugin';
import { IProduct } from './Product';


//商品列表
export interface Products{
    productId?:ObjectID | IProduct;     //商品ID
    count:number;   //数量
}

//购物车表
export interface IShopCart extends BaseDocument{
    memberId?:ObjectID;     //会员ID
    productList?:Products[];    //商品列表

}   

export default (app: Application) => {
    const mongoose = app.mongoose;
    
    const ShopCartSchema = new mongoose.Schema({
    memberId: { type: Schema.Types.ObjectId, required: true },
    productList:[{
        productId:{ type: Schema.Types.ObjectId, required:true, ref: 'Product'},
        count:{ type: Schema.Types.Number, required:true}
    }]
    });

    ShopCartSchema.plugin(defaultFieldsPlugin);
    return mongoose.model<IShopCart>('ShopCart', ShopCartSchema);
}