import Vue from 'vue'
import Vuetify from 'vuetify/lib'
import colors from 'vuetify/lib/util/colors'

Vue.use(Vuetify)

const vuetify = new Vuetify({
  theme: {
    themes: {
      light: {
        primary: colors.red,
        secondary: colors.grey.darken2,
        accent: colors.black,
        error: colors.red.darken4,
        info: colors.cyan.accent2,
        success: colors.green.accent3,
        warning: colors.yellow.accent2,
      },
      dark: {
        primary: colors.red,
        secondary: colors.grey.darken2,
        accent: colors.black,
        error: colors.red.darken4,
        info: colors.cyan.accent2,
        success: colors.green.accent3,
        warning: colors.yellow.accent2,
      },
    },
  },
})

export default vuetify
