export class ContactCreateReqModel {
  user_id: string
  first_name: string
  last_name?: string
  email?: string
  phone?: string
}

export class ContactCreateResModel {
  id: string = ''
  first_name: string = ''
  last_name: string = ''
  email: string = ''
  phone: string = ''
}
