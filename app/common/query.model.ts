import { DocumentQuery, Model, Document, Connection } from 'mongoose';
import { Application, Context, MongooseSingleton } from 'egg';
import { Condition } from './mongo.base';
import * as lodash from 'lodash';
import { RuleOptions } from './rules';


/**
 * 查询字符串信息校验
 */
export const queryValidationRule = {
  page: {
    type: 'int',
    min: 1,
    required: false,
  },
  pageSize: {
    type: 'int',
    min: 10,
    max: 100,
    required: false,
  },
  order: {
    type: 'string',
    required: false,
  },
  sort: {
    type: 'string',
    required: false,
  },
};

export function defaultQuery(): Query {
  return {
    page: 1,
    pageSize: 20,
    order: 'asc',
  };
}

export function validateQuery(rules?: RuleOptions) {
  return function (target: any, propertyKey: string, descriptor: PropertyDescriptor) {
    const method: () => Promise<void> = descriptor.value;
    async function doValidate() {
      const app = (this.app as Application);
      const ctx = (this.ctx as Context);

      let _rules = null;

      if (rules) {
        _rules = rules;
      }

      // const queries = ctx.query;

      const queriesInvalid = app.validator.validate(_rules, ctx.request.query);

      if (queriesInvalid) {
        ctx.throw(422, { errors: queriesInvalid });
        return;
      }
      
      // ctx.query = queries;
      await method.call(this);
    }

    descriptor.value = doValidate;
  }
}

export function validateParams(rules?: RuleOptions) {
  return function (target: any, propertyKey: string, descriptor: PropertyDescriptor) {
    const method: () => Promise<void> = descriptor.value;
    async function doValidate() {
      const app = (this.app as Application);
      const ctx = (this.ctx as Context);

      let _rules = null;

      if (rules) {
        _rules = rules;
      }

      // const queries = ctx.query;

      const queriesInvalid = app.validator.validate(_rules, ctx.params);

      if (queriesInvalid) {
        ctx.throw(422, { errors: queriesInvalid });
        return;
      }
      
      // ctx.query = queries;
      await method.call(this);
    }

    descriptor.value = doValidate;
  }
}

export function validateBody(rules?: RuleOptions) {
  
  return function (target: any, propertyKey: string, descriptor: PropertyDescriptor) {
    const method: () => Promise<void> = descriptor.value;
    async function doValidate() {
      const app = (this.app as Application);
      const ctx = (this.ctx as Context);

      let _rules = null;

      if (rules) {
        _rules = rules;
      }
      // const queries = ctx.query;

      const invalid = app.validator.validate(_rules, ctx.request.body);

      if (invalid) {
        ctx.throw(422, { errors: invalid });
        return;
      }
      
      // ctx.query = queries;
      await method.call(this);
    }

    descriptor.value = doValidate;
  }
}

export function validateQueryWithPager(rules?: RuleOptions, throwError?:boolean) {
  return function (target: any, propertyKey: string, descriptor: PropertyDescriptor) {
    const method: () => Promise<void> = descriptor.value;
    async function doValidate() {
      const app = (this.app as Application);
      const ctx = (this.ctx as Context);

      let queries:Query = ctx.request.query;

      if (queries.page) {
        queries['page'] = +queries.page;
      } 
      if (queries.pageSize) {
        queries['pageSize'] = +queries.pageSize;
      }

      const queriesInvalid = app.validator.validate(queryValidationRule, queries);
      // console.log(queriesInvalid, '==== quer invalid');
      const pagerQueries = queriesInvalid ? defaultQuery() : queries;

      if (!pagerQueries.page) {
        pagerQueries.page = defaultQuery().page;
      }
      if (!pagerQueries.pageSize) {
        pagerQueries.pageSize = defaultQuery().pageSize;
      }

      const invalid = app.validator.validate(rules || {}, queries);

      if (invalid) {
        ctx.throw(422, { errors: invalid });
        return;
      }

      ctx.query = {
        ...queries,
        ...pagedQuery,
      };

      await method.call(this);
    }

    descriptor.value = doValidate;
  }
}

export function getPagerParams(query: Query) {
  return lodash.pick(query, ['page', 'pageSize', 'order', 'sort']);
}

export function pagedQuery(documentQuery: DocumentQuery<any, any>, queries: Query) {
  documentQuery = documentQuery.skip((queries.page - 1) * queries.pageSize).limit(+queries.pageSize);
  
  if (queries.sort) {
    const sorts = queries.sort.split(',');
    const orders = queries.order ? queries.order.split(',') : ['asc'];
    const sortCondition: IDict = {};
    for (let i = 0; i < sorts.length; i ++) {
      const odr = orders[i] ? orders[i] : orders[0];
      const s = sorts[i];
      sortCondition[s] = odr === 'asc' ? 1 : -1;
    }
    documentQuery = documentQuery.sort(sortCondition);
  }
  return documentQuery;
}

export async function pagedResultBuild<U extends Document>(mdl: Model<U>, query: Query, callback?: (m: DocumentQuery<U[], U, {}>) => DocumentQuery<U[], U, {}>) {
  // const model: Model = ( as Model);
  // const { }
  const condition = lodash.omit(query, ['page', 'pageSize', 'order', 'sort']);
  
  const total = await mdl.countDocuments(condition);
  let listQuery = mdl.find({
    ...condition,
    deleted: false,
  });

  // mdl.findById()
  listQuery = pagedQuery(listQuery, query);
  
  if (callback) {
   listQuery = callback(listQuery);
  }

  const list = await listQuery;

  

  return {
    total,
    list,
    page: Number(+query.page),
    pageSize: Number(+query.pageSize),
  }
}

export function buildCondition<T extends Condition>(condition: T, softDelete = true): any {
  const defaultCondition = {};

  if (softDelete) {
    defaultCondition['deleted'] = false;
  }

  return {
    ...condition,
    ...defaultCondition,
  }
}

export function getMainConnection(mongooseDB: Connection|MongooseSingleton): Connection {
  let client: Connection;
  if (mongooseDB instanceof Connection) {
    client = mongooseDB;
  } else {
    client = mongooseDB.get('main');
  }

  return client;
}
