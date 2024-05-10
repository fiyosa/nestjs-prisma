export class AddressUpdateReqModel {
  street?: string
  city?: string
  province?: string
  country: string
  postal_code: string
}

export class AddressUpdateResModel {
  id: string = ''
  street: string = ''
  city: string = ''
  province: string = ''
  country: string = ''
  postal_code: string = ''
}
