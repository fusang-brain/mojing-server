import { Service } from 'egg';
import { IDcardDTO } from '../dto/member';

export default class iDcard extends Service{

    /**
     * 绑定身份证
     */
    async createIDcard(iDcard:IDcardDTO){
        const { ctx } = this;
        const { model } = ctx;
        const IDcardVo  = await model.IDcard.findOne({IDcard:iDcard.IDcard})
        console.log(IDcardVo);
        if(IDcardVo){
            return '身份证已存在';
        }
        const IDcardBo = new model.IDcard(iDcard);
        const message =  await IDcardBo.save();
        return message;
    }

    /**
     * 查询绑定身份证列表
     */
    async findIDcards(memberId:ObjectID){
        const { ctx } = this;
        const { model } = ctx;
        const iDcardBo = await model.IDcard.find({
            member:memberId
        })
        return iDcardBo;
    }

    /**
     * 删除绑定的身份证
     */
    async delIDcard(id:ObjectID){
        const { ctx } = this;
        const { model } = ctx;
        await model.IDcard.deleteOne({_id:id});
        return '删除成功';

    }

}