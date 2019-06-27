type TypeOptions = ('string'|'int'|'integer'|'number'|'date'|'dateTime'|'datetime'|'id'|'boolean'|'ObjectId'|'bool'|'string'|'email'|'password'|'url'|'enum'|'object'|'array');

interface RuleItem {
  type: TypeOptions;
  required?: boolean;
  convertType?: ('int'|'number'|'string'|'boolean');
  default?: any;
  max?: number;
  min?: number;
  allowEmpty?: boolean;
  format?: any;
  trim?: boolean;
  compare?: string;
  values?: Array<any>;
  rule?: RuleItem;
  itemType?: TypeOptions;
  // widelyUndefined?: boolean;
}

export interface RuleOptions {
  [key: string]: RuleItem;
}