
import { Service } from 'egg';
import { IUser } from '../model/User';
import { String2PinYin } from '../utils/tools';
import { UserDTO, LoginDTO } from '../dto/user';
import { hashPassword, comparePassword } from '../utils/mbcrypt';
import { LOCAL_PROVIDER } from '../model/Authorization';
import { buildCondition } from '../common/query.model';

export default class User extends Service {

  async register(userBody: UserDTO): Promise<IUser> {
    const { ctx } = this;
    const { model } = ctx;
    const { user } = userBody;

    // check user has registed
    const foundUser = await model.User.findOne(buildCondition({
      email:user.email,
    }));

    // is user has exists
    if (foundUser) {
      ctx.throw('exists user', 400);
      return;
    }

    // create enterprie
    const createdEnterprise = new model.Enterprise({
      name: userBody.enterprise,
      slug: String2PinYin(userBody.enterprise||'-'),
    });

    

    const hashedPassword = await hashPassword(userBody.user.password);

    const createdUser = new model.User({
      email: userBody.user.email,
      realname: userBody.user.realname,
    });

    const createdAuthorization = new model.Authorization({
      provider: LOCAL_PROVIDER,
      provider_id: createdUser._id,
      password: hashedPassword,
      user_id: createdUser._id,
    });

    createdUser.enterprises = [createdEnterprise._id];
    await createdAuthorization.save();
    await createdEnterprise.save();
    return await createdUser.save();
  }

  async login(loginBody: LoginDTO) {
    const { ctx } = this;
    const { model } = ctx;

    const foundUser = await model.User.findOne(buildCondition({
      email: loginBody.username,
    }));

    if (!foundUser) {
      ctx.throw('not found the user', 404);
      return;
    }

    const foundAuth = await model.Authorization.findOne(buildCondition({
      provider_id: foundUser._id.toString(),
      provider: LOCAL_PROVIDER,
    }));

    if (!foundAuth) {
      ctx.throw('Not found the authorization', 404);
      return;
    }

    if (await comparePassword(loginBody.password, foundAuth.password)) {
      return {
        enterprises: foundUser.enterprises,
        ...foundAuth.toJSON(),
      };
    }

    return;
  }

  async findOne(id: string): Promise<IUser|undefined> {
    const { ctx } = this;
    const foundUser = await ctx.model.User.findOne(buildCondition({_id: id}));

    if (foundUser === null) {
      this.ctx.throw(400);
      return;
    }

    return foundUser
  }

  async findOperators(enterprise: string) {
    const { model } = this.ctx;

    const list = await model.User.find(buildCondition({
      enterprises: enterprise,
    })).select(['realname']);

    return list;
  }
}