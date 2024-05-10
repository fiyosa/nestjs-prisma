export class WebResModel<T> {
  data?: T
  errors?: string
  message?: string
  pagination?: PaginationResModel
}

export class PaginationResModel {
  page: number
  limit: number
  total: number
}
