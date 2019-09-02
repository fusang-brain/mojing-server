import { RuleOptions } from '../common/rules';

export const CreateOptometryRules: RuleOptions = {
  // enterprise: { type: 'string', required: true },
  customerID: { type: 'ObjectId', required: true },
  optometryNote: { type: 'string', required: false },
}

export const UpdateOptometryRules: RuleOptions = {
  enterprise: { type: 'string', required: true },
}