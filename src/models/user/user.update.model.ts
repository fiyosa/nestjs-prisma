import { UserResModel } from '../auth/user.model'

export class UserUpdateReqModel {
  name?: string
  password?: string
}

export class UserUpdateResModel extends UserResModel {}
