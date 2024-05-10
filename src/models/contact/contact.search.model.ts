export class ContactSearchQueryModel {
  name?: string
  email?: string
  phone?: string

  page: number
  limit: number
}

export class ContactSearchResModel {
  id: string = ''
  first_name: string = ''
  last_name: string = ''
  email: string = ''
  phone: string = ''
}
