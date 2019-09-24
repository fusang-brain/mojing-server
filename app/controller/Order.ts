import { Controller } from 'egg';
import { request, body, summary, tag } from '@fsba/egg-wrapper';
const Tag = tag('App订单模块');

export default class OrderController extends Controller{


    @request('post','/app/order/')
    @summary('生成订单')
    @Tag
    @body({
        shopCartId: {type:'ObjectId' , required:false, description: '购物车ID' },
        memberId:{type:'ObjectId',required:true, description: '会员ID'},
        address:{type:'ObjectId',required:false, description: '地址信息对象'},
        logistics:{type:'ObjectId',required:false, description: '物流信息对象'},
        productList: {
            type:'array',
            itemType: 'object',
            rule: {
                productId:{type:'ObjectId', required:true , description:'商品ID'},
                count:{ type:'number',required:true,description:'数量' }
            }
        }
    })
    async createOrder(){
        const { ctx } = this;
        const { service } = ctx;
        const message =  await service.order.createOrder(ctx.request.body);
        ctx.body = {
            message:message,
        }
        ctx.status =201;
    }


}