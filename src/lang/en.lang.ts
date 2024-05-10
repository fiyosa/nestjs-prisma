import { LangModel } from './lang.model'

export class EnLang implements LangModel {
  public static user: 'User'
  public static post: 'Post'
  public static room_chat: 'Room chat'
  public static room_join: 'Room join'
  public static chat: 'Chat'

  public static retrieved_successfully: ':operator retrieved successfully'
  public static saved_successfully: ':operator saved successfully'
  public static updated_successfully: ':operator updated successfully'
  public static deleted_successfully: ':operator deleted successfully'

  public static credentials_failed: 'Credentials failed'
  public static save_failed: ':operator failed to save'
  public static delete_failed: ':operator failed to delete'
  public static something_went_wrong: 'Something went wrong'
  public static not_found: ':operator not found'
}
