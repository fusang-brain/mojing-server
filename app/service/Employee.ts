
import { Service } from 'egg';
import { getMainConnection, getPagerParams, pagedResultBuild } from '../common/query.model';
import { IEmployee } from '../model/Employee';
import { IAuthorization, LOCAL_PROVIDER } from '../model/Authorization';
import { hashPassword, genInitialPassword } from '../utils/mbcrypt';
import { IUser } from '../model/User';
import { NotFoundError } from '../exception';

export interface EmployeeBody extends IDict {
  realname?: string;
  email?: string;
  phone?: string;
  job?: string;
  role?: string;
}

export default class Employee extends Service {
  async create(body: EmployeeBody) {
    const { model, app: { mongooseDB } } = this.ctx;

    const client = await getMainConnection(mongooseDB);

    const session = await client.startSession();
    session.startTransaction();
    const opts = { session };
    try {
      const initialPassword = genInitialPassword();
      const hashedPassword = await hashPassword(initialPassword);
      let newUser: IUser = null;
      let newAuth: IAuthorization = null;
      // check user is exists

      const foundUser = await model.User.findOne({
        phone: body.phone,
        deleted: false,
      }).session(session);

      if (foundUser) {
        newUser = foundUser;
        if (newUser.enterprises.indexOf(body.enterprise) < 0) {
          newUser.enterprises.push(body.enterprise);
        }

      } else {
        newUser = new model.User({
          realname: body.realname,
          phone: body.phone,
          enterprises: [this.ctx.enterprise],
        });
      }

      const foundAuth = await model.Authorization.findOne({
        provider: LOCAL_PROVIDER,
        provider_id: newUser._id,
        user_id: newUser._id,
      });

      if (foundAuth) {
        newAuth = foundAuth;
      } else {
        // model.Authorization.create()
        newAuth = new model.Authorization({
          provider: LOCAL_PROVIDER,
          provider_id: newUser._id,
          user_id: newUser._id,
          password: hashedPassword,
          initialPassword: initialPassword,
        } as IAuthorization);
      }

      await newUser.save(opts);
      await newAuth.save(opts);

      const createdEmployee = new model.Employee({
        user: newUser._id,
        enterprise: this.ctx.enterprise,
        job: body.job,
        name: body.realname,
      } as IEmployee);

      await createdEmployee.save({ session });

      // const foundRole = await model.AccessGroup.findOne({ _id: body.role }).session(session);

      // if (!foundRole) {
      //   throw new NotFoundError('Not found this role');
      // }

      await model.EmployeeAccess.create([{
        employee: createdEmployee._id,
        accessGroup: body.role,
      }], {
        session,
      });

      await session.commitTransaction();
      session.endSession();

      return {
        _id: createdEmployee._id,
        user: newUser,
      };

    } catch (e) {
      console.log(e, 'error');
      await session.abortTransaction();
      session.endSession();
      this.ctx.throw(400, e);
      return false;
    }
  }

  async findList(query: Query) {
    const { model } = this.ctx;
    const pagerParams = getPagerParams(query);
    const condition = {
      enterprise: query.enterprise,
      deleted: false,
      ...pagerParams,
    } as any;

    if (query.search) {
      const searchReg = new RegExp(query.search, 'i')
      
      const users = await model.User.find({
        '$or': [
          { 'realname': searchReg },
          { 'email': searchReg },
          { 'phone': searchReg },
        ],
      });

      const userIDs = users.map(u => u.id);
      
      condition['$or'] = [
        {'user': {'$in': userIDs}},
      ]
    }

    const listResults = await pagedResultBuild<IEmployee>(model.Employee, condition, (mdl) => {
      return mdl.populate('user').populate({ path: 'employeeRole', populate: { path: 'accessGroup' } });
    });

    return listResults;
  }

  async remove(id: ObjectID) {
    const { app: { mongooseDB }, enterprise, model } = this.ctx;

    const client = getMainConnection(mongooseDB);

    const session = await client.startSession();

    session.startTransaction();
    try {
      const foundEmployee = await model.Employee.findOne({
        _id: id,
      }).session(session);

      if (!foundEmployee) {
        this.ctx.throw(404, 'not found this employee');
      }

      if (enterprise !== foundEmployee.enterprise.toString()) {
        this.ctx.throw(403, 'no access');
      }

      foundEmployee.deleted = true;

      await foundEmployee.save({ session });
      await session.commitTransaction();
      session.endSession();

    } catch (error) {
      await session.abortTransaction();
      session.endSession();
      this.ctx.throw(400, error);
    }
  }

  async update(id: string, body: EmployeeBody) {
    const { model, app: { mongooseDB } } = this.ctx;

    const { role } = body;

    const client = await getMainConnection(mongooseDB);

    const session = await client.startSession();
    session.startTransaction();

    try {
      const foundEmployee = await model.Employee.findOne({
        _id: id,
      }).session(session);

      if (!foundEmployee) {
        this.ctx.throw(404, 'not found this employee');
      }

      foundEmployee.name = body.realname;
      foundEmployee.job = body.job;

      await foundEmployee.save({ session });
      const foundRole = await model.AccessGroup.findOne({ _id: role }).session(session);

      if (!foundRole) {
        throw new NotFoundError('Not found this role');
      }

      await model.EmployeeAccess.deleteMany({
        employee: foundEmployee._id,
      }).session(session);

      await model.EmployeeAccess.create([{
        employee: foundEmployee._id,
        accessGroup: role,
      }], {
        session,
      });
      
      await session.commitTransaction();
      session.endSession();
    } catch (err) {
      await session.abortTransaction();
      session.endSession();
      console.log(err);
      throw err;
    }
  }
  
}