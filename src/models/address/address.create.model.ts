export class AddressCreateReqModel {
  contact_id: string
  street?: string
  city?: string
  province?: string
  country: string
  postal_code: string
}

export class AddressCreateResModel {
  id: string = ''
  street: string = ''
  city: string = ''
  province: string = ''
  country: string = ''
  postal_code: string = ''
}
