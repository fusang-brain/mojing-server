import { Controller } from 'egg';
import { request, body, summary, tag } from '@fsba/egg-wrapper';
import { path } from 'egg-swagger-decorator';
const Tag = tag('App身份证管理表');

export default class IDcardController extends Controller {

    @request('post', '/app/IDcard/')
    @summary('绑定身份证')
    @Tag
    @body({
        member: { type: 'ObjectId', required: true, description: '会员ID' },
        IDcard: { type: 'string', required: true, description: '身份证号' },
        name: { type: 'string', required: true, description: '姓名' },
    })
    async postIDcard() {
        const { ctx } = this;
        const { service } = ctx;
        const message = await service.iDcard.createIDcard(ctx.request.body);
        ctx.body = {
            message: message,
        }
        ctx.status = 201;
    }


    @request('get', '/app/IDcard/{memberId}')
    @summary('查询绑定身份证列表')
    @Tag
    @path({
        memberId: { type: 'ObjectId', required: true, description: '会员ID' }
    })
    async getIDcard() {
        const { ctx } = this;
        const { service } = ctx;
        const list = await service.iDcard.findIDcards(ctx.params.memberId);
        ctx.body = {
            list,
        };
        ctx.status = 201;
    }

    @request('delete', '/app/IDcard/{id}')
    @summary('删除身份证信息')
    @Tag
    @path({
        id: { type: 'ObjectId', required: true, description: '身份证绑定表ID' }
    })
    async delIDcard() {
        const { ctx } = this;
        const { service } = ctx;
        const message = await service.iDcard.delIDcard(ctx.params.id);
        ctx.body = {
            message: message,
        }
        ctx.status = 201;
    }


    @request('get', '/app/IDcard/Optometrys/{iDcard}')
    @summary('通过身份证查询验光数据详情')
    @Tag
    @path({
        iDcard: { type: 'ObjectId', required: true, description: '身份证号' }
    })
    async getOptometrysByIDcard() {
        const { ctx } = this;
        const { service } = ctx;
        const list = await service.optometry.findListByIDcard(ctx.params.iDcard);
        ctx.body = {
            list,
        }
        ctx.status = 201;
    }
}