import { RuleOptions } from '../common/rules';


export const CreateEmployeeRules: RuleOptions = {
  realname: {
    type: 'string',
    required: true,
  },
  email: {
    type: 'string',
    required: false,
  },
  phone: {
    type: 'string',
    required: false,
  },
  job: {
    type: 'string',
    required: false,
  },
}

export const UpdateEmployeeRules: RuleOptions = {
  realname: {
    type: 'string',
    required: true,
  },
  job: {
    type: 'string',
    required: false,
  }
}