
export const UserDTOValidateRules = {
  enterprise: { type: 'string', required: true },
  user: {
    type: 'object',
    rule: {
      password: {
        type: 'string',
        required: false,
      },
      email: {
        type: 'email',
        required: false,
      },
      realname: {
        type: 'string',
        required: true,
      }
    },
  }
};

export const UserLoginValidateRules = {
  username: {
    type: 'string',
    required: false,
  },
  password: {
    type: 'string',
    required: false,
  },
};