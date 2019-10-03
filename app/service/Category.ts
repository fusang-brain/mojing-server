import { Service } from 'egg';
import { CategoryDTO } from '../dto/category';

export default class Category extends Service {

    /**
     * 创建分类
     * @param categoryBody 
     */
    async createCategory(categoryBody: CategoryDTO) {
        const { ctx } = this;
        const { model } = ctx;
        await new model.Category(categoryBody).save();
        return '创建成功'; 
    }

    /**
     * 修改分类
     * @param id 
     * @param categoryBody 
     */
    async updateCategory(id:ObjectID,categoryBody:CategoryDTO){
        const {ctx} = this;
        const {model} = ctx;
        await model.Category.findByIdAndUpdate({_id:id},{name:categoryBody.name,imgPath:categoryBody.imgPath});
        return '修改成功'
    }

    /**
     * 查询分类列表
     */
    async findCategorys(parentId:ObjectID){
        const {ctx} = this;
        const {model} = ctx;
        const categorys =  await model.Category.find({parentId:parentId,deleted:false});
        return categorys;
    }


    /**
     * 查询分类详情
     */
    async findCategoryById(id:ObjectID){
        const {ctx} = this;
        const {model}  = ctx;
        const category = await model.Category.find({_id:id,deleted:false});
        return category;
    }

    /**
     * 删除分类
     * @param id 
     */
    async delCategoryById(id:ObjectID){
        const {ctx} = this;
        const {model} = ctx;
        const category =  await model.Category.findOne({parentId:id,deleted:false});
        if(category){
            return '该分类下有子分类不能删除';
        }
        await model.Category.findByIdAndUpdate(id,{deleted:true});

        return '删除成功'
        
    }

}