export const CreateOptometryRules = {
  enterprise: { type: 'string', required: true },
  customerID: { type: 'ObjectId', required: true },
  optometryNote: { type: 'string', required: false },
}

export const UpdateOptometryRules = {
  enterprise: { type: 'string', required: true },
}