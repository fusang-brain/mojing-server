import { Service } from 'egg';
import { pagedResultBuild } from '../common/query.model';
import { IProduct } from '../model/Product';
export default class Search extends Service {

    /**
     * 查询商品
     */
    async searchProduct(query: Query, name: string, category: string) {
        const { ctx } = this;
        const { model } = ctx;
        query['name']= new RegExp(name,"i");
        if (category) {
            query['category'] = category;
        }
        const products =  await pagedResultBuild<IProduct>(model.Product,query,mol => {
            return mol.populate('enterpriseInfo').populate('pictures');
        });
        products.list.forEach((item)=>{
            item['unitPurchasePrice'] = null
        });
        // const products = await model.Product.find(condition);
        return products;
    }
}