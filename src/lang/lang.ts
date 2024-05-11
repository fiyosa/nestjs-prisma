import { secret } from '../config/secret'
import { en } from './en.lang'
import { id } from './id.lang'

export const lang = { en, id }

export interface ILang {
  user: string
  contact: string
  address: string

  retrieved_successfully: string
  saved_successfully: string
  updated_successfully: string
  deleted_successfully: string

  unauthorized: string
  save_failed: string
  delete_failed: string
  something_went_wrong: string
  not_found: string
}

export const __ = (msg: keyof ILang, args?: any) => {
  let newMsg: string = lang[secret.APP_LOCALE as keyof typeof lang][msg]
  if (typeof args === 'object' && !Array.isArray(args) && args !== null) {
    Object.keys(args).map((arg: string) => (newMsg = newMsg.replace(':' + arg, args[arg])))
    return newMsg
  }
  return newMsg
}
