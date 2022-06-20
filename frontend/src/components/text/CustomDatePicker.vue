<template>
  <v-menu
    offset-y
    v-model="dateMenu"
    transition="scale-transistion"
    :close-on-content-click="false"
  >
    <template v-slot:activator="{ on }">
      <v-text-field
        clearable
        readonly
        filled
        v-on="on"
        @click:clear="cleared"
        prepend-inner-icon="mdi-calendar"
        :label="label"
        :value="formatDate(picker)"
        :disabled="disableInput"
      />
    </template>
    <v-date-picker
      no-title
      first-day-of-week="1"
      v-model="picker"
      :value="formatDate(picker)"
      @input="dateMenu = false"
    />
  </v-menu>
</template>

<script>
import moment from 'moment'
import i18n from '@/i18n'
export default {
  name: 'custom-date-picker',
  data() {
    return {
      dateMenu: false,
      picker: this.value,
      rules: {
        required: (value) => !!value || i18n.t('Rules.required'),
      },
    }
  },
  props: {
    label: String,
    disableInput: Boolean,
    value: String,
  },
  watch: {
    picker(value) {
      this.$emit('input', value)
    },
  },
  computed: {
    currentUser() {
      return this.$store.state.auth.user
    },
  },
  methods: {
    formatDate(date) {
      return date ? moment(String(date)).format('DD.MM.YYYY') : null
    },
    cleared() {
      this.$emit('input', null)
    },
  },
}
</script>
