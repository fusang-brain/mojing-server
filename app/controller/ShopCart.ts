import { Controller } from 'egg';
import { request, body, summary, tag, path } from '@fsba/egg-wrapper';
const Tag = tag('App购物车模块');

export default class ShopCartController extends Controller{

    @request('post','/app/cart/')
    @summary('加减商品')
    @Tag
    @body({
        memberId:{type:'ObjectId',required:true, description: '会员ID'},
        productId:{type:'ObjectId', required:true , description:'商品ID'},
        count:{ type:'number',required:true,description:'数量' }
    })
    async addToCart(){
        const { ctx } = this;
        const { service } = ctx;
        const message = await service.shopCart.addToCart(ctx.request.body);
        ctx.body = {
            message:message,
        }
        ctx.status =201;
    }

    @request('put','/app/cart/{id}')
    @summary('所有商品同步')
    @Tag
    @path({
        id:{ type: 'ObjectId' ,required : true , description :'购物车ID'}
    })
    @body({
        memberId:{type:'ObjectId',required:true, description: '会员ID'},
        productList: {
            type:'array',
            itemType: 'object',
            rule: {
                productId:{type:'ObjectId', required:true , description:'商品ID'},
                count:{ type:'number',required:true,description:'数量' }
            }
        }
    })
    async putAllToCart(){
        const { ctx } = this;
        const { service } = ctx;
        await service.shopCart.updateCart(ctx.params.id,ctx.request.body);
        ctx.body = {
            message :'同步成功',
        }
        ctx.status = 201;
    }

    @request('put','/app/cart/')
    @summary('单个商品数量同步')
    @Tag
    @body({
        shopCartId:{type:'ObjectId',required:true,description:'购物车ID'},
        productId:{ type:'ObjectId', required:true , description:'商品ID'},
        count:{ type:'number',required:true,description:'数量' }
    })
    async putToCart(){
        const { ctx } = this;
        const { service } = ctx;
        const msg =  await service.shopCart.updateCartCount(ctx.request.body);
        ctx.body = {
            message : msg,
        }
        ctx.status = 201;
    }


    @request('get','/app/cart/{memberId}')
    @summary('购物车详情')
    @Tag
    @path({
        memberId:{type:'ObjectId',required:true,description:'会员ID'}
    })
    async findCart(){
        const { ctx } = this;
        const { service } = ctx;
        const shopCartVo =  await service.shopCart.findCartByMemberId(ctx.params.memberId);
        ctx.body = {
            shopCart: shopCartVo && shopCartVo.toJSON(),
        }
        ctx.status = 201;
    }   

    @request('delete' ,'/app/cart/{id}')
    @summary('批量移除商品')
    @Tag
    @path({
        id:{type:'ObjectId',required:true,description:'购物车ID'}
    })
    @body({
        productIds:{
            type:'array',
            itemType:'ObjectId',
        }
    })
    async delProductToCart(){
        const { ctx } = this;
        const { service } = ctx;
        const message =  await service.shopCart.delProductToCart(ctx.params.id,ctx.request.body.productIds);
        ctx.body = {
            message : message,
        }
        ctx.status = 201;
    }
}