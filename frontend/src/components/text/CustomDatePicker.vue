<template>
  <v-menu
    offset-y
    v-model="dateMenu"
    transition="scale-transistion"
    max-width="290px"
    min-width="290px"
    :close-on-content-click="false"
    :nudge-right="40"
  >
    <template v-slot:acitvator="{ on, attrs }">
      <v-text-field
        readonly
        v-model="user.birthdate"
        prepend-icon="mdi-calendar"
        v-bind="attrs"
        v-on="on"
        :value="formatDate(picker)"
        :label="$t('Validation.birthdate')"
      />
    </template>
    <v-date-picker
      no-title
      first-day-of-the-week="1"
      v-model="picker"
      :min="currentDate"
      @input="dateMenu = false"
    />
  </v-menu>
</template>

<script>
import i18n from '@/i18n'
import moment from 'moment'

export default {
  name: 'custom-date-picker',
  props: {
    label: String,
    min: String,
    disableInput: Boolean,
  },
  watch: {
    picker(value) {
      this.$emit('input', value)
    },
  },
  data() {
    return {
      dateMenu: false,
      rules: {
        required: (value) => !!value || i18n.t('Validation.required'),
      },
      picker: null,
    }
  },
  methods: {
    formatDate(date) {
      return date ? moment(String(date)).format('DD.MM.YYYY') : ''
    },
    cleared() {
      this.$emit('input', null)
    },
    currentDate() {
      const today = new Date()
      return today.toISOString().slice(0, 10)
    },
  },
}
</script>
