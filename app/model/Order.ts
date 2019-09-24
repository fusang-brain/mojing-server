import { BaseDocument } from '../common/mongo.base';
import {Products} from './ShopCart';
import { Schema } from 'mongoose';
import { Application } from 'egg';
import { defaultFieldsPlugin } from '../common/mongo.plugin';
//App 订单表
export interface IOrder extends BaseDocument{
    id?:string;     //订单号
    memberId:ObjectID; //linked member     会员ID
    address?:ObjectID;  //地址信息对象(V2.0)
    logistics?:ObjectID;    //物流信息对象(V2.0)
    productList?:Products[];    //商品列表
    payTime?:Date;      //支付时间
    total?:number;      //总价
    paymentState?: number; //状态:0、未支付,1、已支付
}

export default (app: Application) => {
    const mongoose = app.mongoose;
    
    const OrderSchema = new mongoose.Schema({
        id:{ type: Schema.Types.String, required:true },
        memberId: { type: Schema.Types.ObjectId, required: true },
        address:{ type: Schema.Types.ObjectId , required:false},
        logistics:{ type: Schema.Types.ObjectId , required:false},
        productList:[{
            productId:{ type: Schema.Types.ObjectId, required:true, ref: 'Product'},
            count:{ type: Schema.Types.Number, required:true}
        }],
        payTime:{ type: Schema.Types.Date ,required: false},
        total:{ type:Schema.Types.Number , required:true},
        paymentState:{ type:Schema.Types.Number, required:true,default:0 }
    });

    OrderSchema.plugin(defaultFieldsPlugin);
    return mongoose.model<IOrder>('Order', OrderSchema);
}
