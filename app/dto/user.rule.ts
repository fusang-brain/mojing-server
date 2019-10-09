import { RuleOptions } from '../common/rules';

export const UserDTOValidateRules: RuleOptions = {
  enterpriseName: { type: 'string', required: false },
  validateCode: { type: 'string', required: true },
  user: {
    type: 'object',
    rule: {
      password: {
        type: 'string',
        required: true,
      },
      email: {
        type: 'email',
        required: false,
      },
      realname: {
        type: 'string',
        required: true,
      },
      mobile: {
        type: 'string',
        required: true,
      }
    },
  }
};

export const UserLoginValidateRules: RuleOptions = {
  username: {
    type: 'string',
    required: false,
  },
  password: {
    type: 'string',
    required: false,
  },
};