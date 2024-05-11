import i18next from 'i18next'
import id from 'zod-i18n-map/locales/id/zod.json'
import en from 'zod-i18n-map/locales/en/zod.json'
import { zodI18nMap } from 'zod-i18n-map'
import { ZodType, z as zod } from 'zod'
import { secret } from './secret'

i18next.init({
  lng: secret.APP_LOCALE,
  resources: {
    id: { zod: id },
    en: { zod: en },
  },
})
zod.setErrorMap(zodI18nMap)

export { zod, ZodType }
