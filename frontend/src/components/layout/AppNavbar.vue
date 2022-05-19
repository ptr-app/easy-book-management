<template>
  <v-app-bar app hide-on-scroll v-if="currentUser && !mobile">
    <template v-slot:extension>
      <v-tabs align-with-title>
        <v-tabs-slider color="red" />
        <v-tab
          v-for="tab in tabs"
          :key="tab"
          :to="tab.link"
          v-text="tab.text"
        />
      </v-tabs>
    </template>
    <v-spacer />
    <v-btn icon @click="toggleDarkMode">
      <v-icon v-if="darkMode">mdi-weather-sunny</v-icon>
      <v-icon v-if="!darkMode">mdi-weather-night</v-icon>
    </v-btn>
  </v-app-bar>
</template>

<script>
import i18n from '@/i18n'
export default {
  name: 'app-navbar',
  data() {
    return {
      tabs: [{ text: i18n.t('TabHeader.home'), link: '/home' }],
      darkMode: false,
    }
  },
  computed: {
    currentUser() {
      return this.$store.state.auth.user
    },
    switchLabel: function () {
      return this.darkMode ? 'light' : 'dark'
    },
  },
  created() {
    this.mobile = this.$vuetify.breakpoint.mdAndDown
    this.initializeTabs()
  },
  methods: {
    initializeTabs() {
      let role = 'teacher'
      if (role === 'teacher' || role === 'dean') {
        this.tabs.push({ text: i18n.t('TabHeader.books'), link: '/books' })
        this.tabs.push({ text: i18n.t('TabHeader.class'), link: '/class' })
      }
      if (role === 'dean') {
        this.tabs.push({
          text: i18n.t('TabHeader.students'),
          link: '/students',
        })
        this.tabs.push({
          text: i18n.t('TabHeader.employee'),
          link: '/employee',
        })
      }
    },
    toggleDarkMode: function () {
      this.$vuetify.theme.dark = !this.$vuetify.theme.dark
      this.darkMode = !this.darkMode
    },
  },
}
</script>
