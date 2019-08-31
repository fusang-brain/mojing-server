import { RuleOptions } from '../common/rules';

export const CreateCustomerRules: RuleOptions = {
  // enterprise: { type: 'string', required: true },
  name: { type: 'string', required: true },
  mobile: { type: 'string', required: true },
  gender: { type: 'string', required: true },
  birthday: { type: 'string', required: false },
  wechat: { type: 'string', required: false },
  contactAddress: { type: 'string', required: false },
  job: { type: 'string', required: false },
  introducer: { type: 'string', required: false },
  integral: { type: 'number', required: false },
  lastShopDate: { type: 'string', required: false },
  lastOptometryDate: { type: 'string', required: false },
  lastConsumotionAmount: { type: 'number', required: false },
  consumptionTotalAmount: { type: 'number', required: false },
  consumptionCount: { type: 'number', required: false },
  // contacts: { type: 'string', required: false },
  
  // postcode: { type: 'string', required: false },
  // corporationTax: { type: 'string', required: false },
  // bank: { type: 'string', required: false },
  note: { type: 'string', required: false },
}

export const UpdateCustomerRules: RuleOptions = {
  // enterprise: { type: 'string', required: true },
  name: { type: 'string', required: true },
  mobile: { type: 'string', required: true },
  gender: { type: 'string', required: true },
  birthday: { type: 'string', required: false },
  wechat: { type: 'string', required: false },
  contactAddress: { type: 'string', required: false },
  job: { type: 'string', required: false },
  introducer: { type: 'string', required: false },
  integral: { type: 'number', required: false },
  lastShopDate: { type: 'string', required: false },
  lastOptometryDate: { type: 'string', required: false },
  lastConsumotionAmount: { type: 'number', required: false },
  consumptionTotalAmount: { type: 'number', required: false },
  consumptionCount: { type: 'number', required: false },
  // contacts: { type: 'string', required: false },
  
  // postcode: { type: 'string', required: false },
  // corporationTax: { type: 'string', required: false },
  // bank: { type: 'string', required: false },
  note: { type: 'string', required: false },
}