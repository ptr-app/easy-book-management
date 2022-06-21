<template>
  <v-snackbar
    :color="notification.class"
    multi-line
    v-model="snackbar"
    top
    :timeout="10000"
    data-cy="snackbarNotification"
  >
    <v-layout align-center pr-4>
      <v-icon class="pr-3" dark :icon="notification.icon" />
      <v-layout column v-text="notification.text" />
      <template v-slot:action="{ attrs }">
        <v-btn text v-bind="attrs" @click="snackbar = false">
          <v-icon dark icon="mdi-close" />
        </v-btn>
      </template>
    </v-layout>
  </v-snackbar>
</template>

<script>
import { mapGetters } from 'vuex'
export default {
  name: 'alert-popup',
  computed: {
    ...mapGetters({
      notification: 'ui/notification',
    }),
    snackbar: {
      get() {
        return this.$store.getters['ui/notification'].display
      },
      set() {
        this.$store.commit('ui/setNotification', {
          display: false,
        })
      },
    },
  },
}
</script>
