import { RuleOptions } from '../common/rules';

export const CreateSaleRules: RuleOptions = {
  customer: { type: 'ObjectId', required: true },
  amount: { type: 'number', required: true },
  saleDate: { type: 'string', required: true },
  state: { type: 'number', required: false },
  paidType: { type: 'number', required: false },
  arrears: { type: 'number', required: false },
  products: {
   type: 'array',
   itemType: 'ObjectId',
   required: false,
  },
  productsCount: {
    type: 'array',
    itemType: 'object',
    required: false,
    rule: {
      id: { type: 'ObjectId', required: true },
      count: { type: 'number', required: true },
    },
  },
  paidRecords: {
    type: 'array',
    itemType: 'object',
    rule: {
      date: {
        type: 'string',
        required: false,
      },
      amount: {
        type: 'number',
        required: false,
      },
      paidType: {
        type:'number',
        required: false,
      },
    },
  }
}

export const RemoveSaleRules: RuleOptions = {
  id: { type: 'ObjectId', required: true },
}