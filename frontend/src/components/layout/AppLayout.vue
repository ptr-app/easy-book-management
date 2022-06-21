<template>
  <div>
    <app-navbar />
    <alert-popup />
    <v-main>
      <router-view />
    </v-main>
  </div>
</template>

<script>
import AppNavbar from './AppNavbar'
import AlertPopup from './AlertPopup'
export default {
  name: 'app-layout',
  components: {
    AppNavbar,
    AlertPopup,
  },
}
</script>
