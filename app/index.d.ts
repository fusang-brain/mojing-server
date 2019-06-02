
interface BaseQuery {
  [key: string]: any;
}

interface Query extends BaseQuery {
  page?: number;
  pageSize?: number;
  order?: 'asc'|'desc';
  sort?: string;
}

type ObjectID = any;

interface IDict {
  [key: string]: any;
}