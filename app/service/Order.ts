import { Service } from 'egg';
import { OrderDTO } from '../dto/order';
import { genOrderNO } from '../utils/tools';
import { getMainConnection } from '../common/query.model';

export default class order extends Service {
    /**
     * 生成订单
     */
    async createOrder(orderDTO: OrderDTO){
        const { ctx } = this;
        const { service , model ,app: { mongooseDB } } = ctx;
        const client = getMainConnection(mongooseDB);
        const session = await client.startSession();
        session.startTransaction();
        try {
            if(orderDTO.shopCartId){
                //从购物车移除
                let prodcutIds = []
                orderDTO.productList.forEach((item)=>{
                    prodcutIds.push(item.productId);
                })
                await service.shopCart.delProductToCart(orderDTO.shopCartId,prodcutIds);
            }
            //生成订单
            let total = 0;
            const products = orderDTO.productList;
            for(let i = 0;i<products.length;i++){
                const prodcut =  await model.Product.findOne({_id:products[i].productId});
                total += (prodcut.salePrice * products[i].count) ;
            }
            const id = genOrderNO();
            const order =  new model.Order({
                id:id,
                memberId:orderDTO.memberId,
                address:orderDTO.address,
                logistics:orderDTO.logistics,
                productList:orderDTO.productList,
                total:total,
                paymentState:0,
            });
            await order.save();
            await session.commitTransaction();
            //关闭session
            session.endSession();
            return '生成订单成功';
        } catch (error) {
            await session.abortTransaction();
            session.endSession();
            return error;
        }
       
    } 
}