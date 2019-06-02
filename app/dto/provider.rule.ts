
export const CreateProviderRules = {
  enterprise: { type: 'string', required: true },
  name: { type: 'string', required: true },
  contacts: { type: 'string', required: false },
  contactPhone: { type: 'string', required: false },
  address: { type: 'string', required: false },
  postcode: { type: 'string', required: false },
  corporationTax: { type: 'string', required: false },
  bank: { type: 'string', required: false },
  note: { type: 'string', required: false },
}

export const UpdateProviderRules = {
  name: { type: 'string', required: false },
  contacts: { type: 'string', required: false },
  contactPhone: { type: 'string', required: false },
  address: { type: 'string', required: false },
  postcode: { type: 'string', required: false },
  corporationTax: { type: 'string', required: false },
  bank: { type: 'string', required: false },
  note: { type: 'string', required: false },
}