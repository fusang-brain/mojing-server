import { BaseDocument } from '../common/mongo.base';
import { Schema } from 'mongoose';
import { Application } from 'egg';
import { defaultFieldsPlugin } from '../common/mongo.plugin';

//App 分类表
export interface ICategory extends BaseDocument{
    name?:string;       //分类名称
    imgPath?:string;    //分类图片
    parentId?:ObjectID; //上级ID
}

export default (app: Application) => {
    const mongoose = app.mongoose;
    
    const CategorySchema = new mongoose.Schema({
        name:{ type: Schema.Types.String, required:true },
        imgPath: { type: Schema.Types.String, required: false },
        parentId:{ type: Schema.Types.ObjectId , required:false },
    });

    CategorySchema.plugin(defaultFieldsPlugin);
    return mongoose.model<ICategory>('Category', CategorySchema);
}