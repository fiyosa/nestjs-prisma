import { EnLang } from './en.lang'

export class Lang {
  public static EN = new EnLang()
}

export class LangModel {
  public static user: string
  public static post: string
  public static room_chat: string
  public static room_join: string
  public static chat: string

  public static retrieved_successfully: string
  public static saved_successfully: string
  public static updated_successfully: string
  public static deleted_successfully: string

  public static credentials_failed: string
  public static save_failed: string
  public static delete_failed: string
  public static something_went_wrong: string
  public static not_found: string
}
