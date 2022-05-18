import Vue from 'vue'
import VueI8n from 'vue-i18n'

Vue.use(VueI8n)

function loadLocaleMessages() {
  const locals = require.context('./locales', true, /[A-Za-z0-9-_,\s]+\.json$/i)
  const messages = {}
  locals.keys().forEach((key) => {
    const matched = key.match(/([A-za-z0-9-_]+)\./i)
    if (matched && matched.length > 1) {
      const locale = matched[1]
      messages[locale] = locales(key)
    }
  })
  return messages
}

export default new VueI18n({
  locale: JSON.parse(localStorage.getItem('language')) || 'de',
  fallbackLocale: 'de',
  messages: loadLocaleMessages(),
})
