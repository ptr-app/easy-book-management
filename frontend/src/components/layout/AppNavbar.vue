<template>
  <v-app-bar app hide-on-scroll v-if="currentUser && !mobile">
    <template v-slot:extension>
      <v-tabs align-with-title>
        <v-tabs-slider color="red" />
        <v-tab
          v-for="tab in tabs"
          :key="tab.text"
          :to="tab.link"
          v-text="tab.text"
        />
      </v-tabs>
    </template>
    <v-spacer />
    <v-btn icon @click="logout">
      <v-icon>mdi-logout</v-icon>
    </v-btn>
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
    }
  },
  computed: {
    currentUser() {
      return this.$store.state.auth.user
    },
    darkMode() {
      this.$vuetify.theme.dark = this.$store.state.auth.darkMode
      return this.$store.state.auth.darkMode
    },
  },
  created() {
    this.mobile = this.$vuetify.breakpoint.mdAndDown
    this.initializeTabs()
  },
  methods: {
    initializeTabs() {
      let role = this.currentUser.role
      if (role === 'teacher' || role === 'dean') {
        this.tabs.push({ text: i18n.t('TabHeader.books'), link: '/books' })
      }
      if (role === 'dean') {
        this.tabs.push({ text: i18n.t('TabHeader.class'), link: '/class' })
        this.tabs.push({
          text: i18n.t('TabHeader.students'),
          link: '/students',
        })
      }
    },
    toggleDarkMode() {
      this.$store.commit('auth/setDarkMode', !this.darkMode)
    },
    logout() {
      this.$store
        .dispatch('auth/logout')
        .then(() => {
          this.$router.push('/login')
        })
        .catch((error) => {
          console.log(error)
        })
    },
  },
}
</script>
