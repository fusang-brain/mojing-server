import { Controller } from 'egg';
import { request, body, summary, tag } from '@fsba/egg-wrapper';
import { path, query } from 'egg-swagger-decorator';
const Tag = tag('App分类模块');

export default class CategoryController extends Controller {

    @request('post', '/app/category/')
    @summary('创建分类')
    @Tag
    @body({
        name: { type: 'string', required: true, description: '分类名称' },
        imgPath:{type:'string',required:false,description:'图片链接'},
        parentId:{type:'ObjectId',required:false,description:'上级ID'}
    })
    async createCategory() {
        const { ctx } = this;
        const { service } = ctx;
        const message =  await service.category.createCategory(ctx.request.body);
        ctx.body = {
            message:message,
        }
        ctx.status = 201;
    }

    @request('put','/app/category/{id}')
    @summary('修改分类')
    @Tag
    @path({
        id:{type:'ObjectId',required:true,description:'分类ID'}
    })
    @body({
        name:{type:'string',required:true,description:'分类名称'},
        imgPath:{type:'string',required:false,description:'图片链接'},
    })
    async updateCategory(){
        const {ctx} = this;
        const {service} = ctx;
        const message = await service.category.updateCategory(ctx.params.id,ctx.request.body);
        ctx.body = {
            message:message,
        }
        ctx.status = 201;
    }

    // path

    // query

    // body

    @request('get','/app/category')
    @summary('查询分类列表')
    @Tag
    @query({
        parentId:{ type:'ObjectId',required:false,description:'上级分类ID，不传查一级分类'}
    })
    async getCategory(){
        const {ctx} = this;
        const {service} = ctx;
        const list = await service.category.findCategorys(ctx.query.parentId);
        ctx.body = {
            list,
        }
        ctx.status = 201;
    }

    @request('get','/app/category/{id}')
    @summary('查询分类详情')
    @Tag
    @path({
        id:{type:'ObjectId',required:true,description:'分类ID'}
    })
    async getCategoryById(){
        const {ctx} = this;
        const {service} = this;
        const category =  await service.category.findCategoryById(ctx.params.id);
        ctx.body ={
            category
        }
        ctx.status = 201;
    }

    @request('delete','/app/category/{id}')
    @summary('删除分类')
    @Tag
    @path({
        id:{type:'ObjectId',required:true,description:'分类ID'}
    })
    async delCategoryById(){
        const {ctx} = this;
        const {service} = ctx;
        const message = await service.category.delCategoryById(ctx.params.id);
        ctx.body = {
            message:message,
        }
        ctx.status = 201;
    }

}