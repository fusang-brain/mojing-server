import { Service } from 'egg';
import { ShopCartDTO, PutShopCartDTO } from '../dto/shopCart';
import lodash from 'lodash';


export default class ShopCart extends Service {
  /**
   * 添加商品至购物车
   */
  async addToCart(shopCartDTO: ShopCartDTO): Promise<string> {
    const { ctx } = this;
    const { model } = ctx;
    //先根据会员ID查询
    const shopCart = await model.ShopCart.findOne({ memberId: shopCartDTO.memberId });
    if (!shopCart) {
      //若不存在，添加购物车对象
      const shopcartBo = new model.ShopCart({
        memberId: shopCartDTO.memberId,
        productList: [
          {
            productId: shopCartDTO.productId,
            count: shopCartDTO.count,
          }
        ]
      });
      shopcartBo.save();
      // await model.ShopCart.create(shopCartDTO);
      return '添加成功';
    }
    //若存在，判断商品列表中是否存在要添加的商品  
    const index = lodash.findIndex(shopCart.productList, function (n) {
      return n.productId === shopCartDTO.productId;
    });
    console.log(index);
    if (index >= 0) {
      //2存在，+数量
      shopCart.productList[index].count += shopCartDTO.count;
    } else {
      //2不存在，添加进去
      shopCart.productList.push({
        productId: shopCartDTO.productId,
        count: shopCartDTO.count,
      })
    }
    shopCart.save();
    return '添加成功'
  }
  /**
   * 查询购物车详情
   */
  async findCartByMemberId(memberId: ObjectID) {
    const { ctx } = this;
    const { model } = ctx;
    const shopCart = await model.ShopCart.findOne({ 'memberId': memberId }).populate({
      path: 'productList.productId',
      populate: {
        path: 'enterpriseInfo',
      }
    })
    return shopCart;
  }
  /**
   * 单个商品数量同步
   */
  async updateCartCount(shopCartDTO: ShopCartDTO) {
    const { ctx } = this;
    const { model } = ctx;
    const flag = await model.ShopCart.updateOne({ _id: shopCartDTO.shopCartId, 'productList.productId': shopCartDTO.productId }, { 'productList.$.count': shopCartDTO.count })
    if (flag > 0) {
      return '修改成功';
    }
    return '修改失败';
  }
  /**
   * 同步所有商品
   */
  async updateCart(id: ObjectID, putShopCartDTO: PutShopCartDTO) {
    const { ctx } = this;
    const { model } = ctx;
    await model.ShopCart.findByIdAndUpdate(id, putShopCartDTO);
  }

  /**
   * 移除购物车列表中的商品
   */
  async delProductToCart(id: ObjectID, productIds: Array<ObjectID>) {
    const { ctx } = this;
    const { model } = ctx;
    const shopCartBo = await model.ShopCart.findById(id);
    const oldProduct = [...shopCartBo.productList];
    productIds.forEach((item) => {
      lodash.remove(oldProduct, function (n) {
        return n.productId = item;
      });
    });
    shopCartBo.productList = oldProduct;
    await shopCartBo.save();
    return '移除成功';
  }

}