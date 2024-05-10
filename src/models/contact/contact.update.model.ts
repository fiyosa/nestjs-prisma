export class ContactUpdateReqModel {
  first_name: string
  last_name?: string
  email?: string
  phone?: string
}

export class ContactUpdateResModel {
  id: string = ''
  first_name: string = ''
  last_name: string = ''
  email: string = ''
  phone: string = ''
}
