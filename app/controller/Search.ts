import { Controller } from 'egg';
import { request, summary, tag } from '@fsba/egg-wrapper';
import { query } from 'egg-swagger-decorator';
const Tag = tag('App搜索模块');

export default class SearchController extends Controller {
    @request('get', '/app/search')
    @summary('搜索商品')
    @Tag
    @query({
        page :{ type:'number',request:false,description:'当前页'},
        pageSize:{type:'number',request:false,description:'每页数量'},
        name: { type: 'string', request: false, description: '商品名称' },
        category: { type: 'string', request: false, description: '商品分类'}
    })
    async searchProduct() {
        const {ctx} = this;
        const {service} = ctx;
        const products =  await service.search.searchProduct(ctx.query,ctx.query.name,ctx.query.category);
        ctx.body = {
            products,
        }
        ctx.status = 201;
    }
}