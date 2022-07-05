<template>
  <v-dialog v-model="dialog" persistent width="auto">
    <v-card>
      <v-card-title v-text="$t('StudentPage.editClass.header')" />
      <v-card-text>
        <v-container>
          <div>
            <v-row>
              <validation-provider
                v-slot="{ error }"
                rules="required"
                :name="$t('Validation.class')"
              >
                <v-select
                  filled
                  required
                  v-model="student.newClassName"
                  :label="$t('Validation.class')"
                  :items="classes"
                  :error-messages="error"
                />
              </validation-provider>
            </v-row>
          </div>
          <div class="mt-6 mr-4 ml-n3">
            <v-row>
              <v-col cols="12" sm="6">
                <v-btn
                  :loading="loading"
                  v-text="$t('Buttons.cancel')"
                  @click="$emit('close')"
                />
              </v-col>
              <v-col cols="12" sm="6">
                <v-btn
                  :loading="loading"
                  v-text="$t('Buttons.editStudentClass')"
                  @click="editClass"
                />
              </v-col>
            </v-row>
          </div>
        </v-container>
      </v-card-text>
    </v-card>
  </v-dialog>
</template>

<script>
import i18n from '@/i18n'
import { extend, ValidationObserver, ValidationProvider } from 'vee-validate'
import { required } from 'vee-validate/dist/rules'
import CustomDatePicker from '../../components/text/CustomDatePicker.vue'

extend('required', {
  ...required,
  message: i18n.t('Validation.required'),
})

extend('validateName', {
  validate: (value) => /(^[a-zA-Z0-9\-.äöüÄÖÜ\s]+)$/.test(value),
  message: i18n.t('Validation.validateName'),
})

export default {
  name: 'add-book-dialog',
  components: {
    ValidationObserver,
    ValidationProvider,
    CustomDatePicker,
  },
  data() {
    return {
      loading: false,
      student: {},
      classes: [],
    }
  },
  props: {
    dialog: Boolean,
    selectedStudent: Object,
  },
  computed: {
    currentUser() {
      return this.$store.state.auth.user
    },
  },
  created() {
    this.student = this.selectedStudent
    this.student.oldClassName = this.student.className
    this.student.newClassName = this.student.className
    this.initClasses()
  },
  methods: {
    initClasses() {
      this.loading = true
      this.$store
        .dispatch('data/getClassBySchool')
        .then(async (resp) => {
          resp.forEach((Class) => {
            this.classes.push(Class.name)
          })
          this.loading = false
        })
        .catch((err) => {
          this.loading = false
          console.log(err)
        })
    },
    editClass() {
      this.$store
        .dispatch('data/editClassStudent', this.student)
        .then(() => {
          this.loading = false
          this.$emit('done')
        })
        .catch((err) => {
          this.loading = false
          console.log(err)
        })
    },
  },
}
</script>
