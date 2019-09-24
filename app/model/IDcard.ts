import { BaseDocument } from '../common/mongo.base';
import { Schema } from 'mongoose';
import { Application } from 'egg';
import { defaultFieldsPlugin } from '../common/mongo.plugin';
import Member from '../service/Member';


//App 身份证管理表
export interface IIDcard extends BaseDocument{
    member:ObjectID|Member; //linked member     会员ID
    IDcard?:string;  //身份证号
    name?:string;    //姓名
}

export default (app: Application) => {
    const mongoose = app.mongoose;
    
    const  IDcardSchema = new mongoose.Schema({
        member: { type: Schema.Types.ObjectId, required: true },
        IDcard:{ type: Schema.Types.String , required:true},
        name:{ type: Schema.Types.String , required:true},
    });

    IDcardSchema.plugin(defaultFieldsPlugin);
    return mongoose.model<IIDcard>('IDcard', IDcardSchema);
}